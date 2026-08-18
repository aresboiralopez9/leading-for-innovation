import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_API_KEY = process.env.RESEND_API_KEY!
const CRON_SECRET = process.env.CRON_SECRET!

const SITE_URL = 'https://leadingforinnovation.com'
const FROM_EMAIL =
  'Leading for Innovation <newsletter@leadingforinnovation.com>'
const REPLY_TO = 'leadingforinnovation@gmail.com'

function getPostUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`
}

function getUnsubscribeUrl(token: string) {
  return (
    `${SITE_URL}/api/newsletter/unsubscribe?token=` +
    encodeURIComponent(token)
  )
}

function buildNewsletterHtml(
  post: {
    title: string
    excerpt: string
    category: string
    slug: string
  },
  unsubscribeToken: string
) {
  const articleUrl = getPostUrl(post.slug)
  const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken)

  return `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:40px 20px;">

        <div style="background:#104d36;border-radius:20px 20px 0 0;padding:30px 32px;">
          <img
            src="${SITE_URL}/lfi-horizontal-logo.png"
            alt="Leading for Innovation"
            width="230"
            style="display:block;width:230px;max-width:100%;height:auto;"
          />
        </div>

        <div style="background:#ffffff;padding:40px 32px;">

          <p style="
            margin:0 0 14px;
            font-size:12px;
            line-height:1.4;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
            color:#3f8d70;
          ">
            ${post.category}
          </p>

          <h1 style="
            margin:0 0 20px;
            font-size:36px;
            line-height:1.15;
            color:#12372a;
          ">
            ${post.title}
          </h1>

          <p style="
            margin:0 0 32px;
            font-size:17px;
            line-height:1.65;
            color:#4b5563;
          ">
            ${post.excerpt}
          </p>

          <a
            href="${articleUrl}"
            style="
              display:inline-block;
              background:#035AA6;
              color:#ffffff;
              text-decoration:none;
              font-size:15px;
              font-weight:700;
              padding:14px 22px;
              border-radius:9px;
            "
          >
            Read the full article →
          </a>

          <div style="
            margin-top:40px;
            padding-top:28px;
            border-top:1px solid #e5e7eb;
          ">
            <p style="
              margin:0;
              font-size:14px;
              line-height:1.6;
              color:#6b7280;
            ">
              New research informed insights from Leading for Innovation,
              translating creativity and innovation research into practical
              ideas for managers and leaders.
            </p>
          </div>

        </div>

        <div style="
          background:#f8faf9;
          padding:24px 32px;
          border-radius:0 0 20px 20px;
        ">

          <p style="
            margin:0;
            font-size:12px;
            line-height:1.6;
            color:#9ca3af;
          ">
            You are receiving this email because you subscribed to
            Leading for Innovation.
          </p>

          <p style="
            margin:10px 0 0;
            font-size:12px;
            line-height:1.6;
          ">
            <a
              href="${unsubscribeUrl}"
              style="color:#6b7280;"
            >
              Unsubscribe
            </a>
          </p>

        </div>

      </div>
    </div>
  `
}

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')

  if (!CRON_SECRET || authorization !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const posts = getAllPosts()

    const sentResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_sent_posts?select=post_slug`,
      {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!sentResponse.ok) {
      const error = await sentResponse.text()
      console.error('Sent posts lookup failed:', error)

      return NextResponse.json(
        { error: 'Unable to check sent posts.' },
        { status: 500 }
      )
    }

    const sentRows = await sentResponse.json()

    const sentSlugs = new Set<string>(
      sentRows.map((row: { post_slug: string }) => row.post_slug)
    )

    const newPosts = posts.filter(
      (post) => !sentSlugs.has(post.slug)
    )

    if (newPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new posts to send.',
        postsSent: 0,
        subscribers: 0,
      })
    }

    const subscribersResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers` +
        '?confirmed=eq.true' +
        '&unsubscribed_at=is.null' +
        '&select=id,email,unsubscribe_token',
      {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!subscribersResponse.ok) {
      const error = await subscribersResponse.text()
      console.error('Subscriber lookup failed:', error)

      return NextResponse.json(
        { error: 'Unable to load subscribers.' },
        { status: 500 }
      )
    }

    const subscribers = await subscribersResponse.json()

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No confirmed subscribers.',
        postsSent: 0,
        subscribers: 0,
      })
    }

    let totalSent = 0

    for (const post of newPosts) {
      const emails = subscribers.map(
        (subscriber: {
          email: string
          unsubscribe_token: string
        }) => ({
          from: FROM_EMAIL,
          reply_to: REPLY_TO,
          to: [subscriber.email],
          subject: `New from Leading for Innovation: ${post.title}`,
          html: buildNewsletterHtml(
            {
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
              slug: post.slug,
            },
            subscriber.unsubscribe_token
          ),
        })
      )

      const batchSize = 100

      for (
        let start = 0;
        start < emails.length;
        start += batchSize
      ) {
        const batch = emails.slice(start, start + batchSize)

        const resendResponse = await fetch(
          'https://api.resend.com/emails/batch',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
              'Idempotency-Key': `lfi-newsletter-${post.slug}-${start}`,
            },
            body: JSON.stringify(batch),
          }
        )

        if (!resendResponse.ok) {
          const error = await resendResponse.text()

          console.error(
            `Newsletter send failed for ${post.slug}:`,
            error
          )

          return NextResponse.json(
            {
              error: 'Newsletter sending failed.',
              post: post.slug,
            },
            { status: 500 }
          )
        }

        totalSent += batch.length
      }

      const markSentResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/newsletter_sent_posts`,
        {
          method: 'POST',
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=ignore-duplicates',
          },
          body: JSON.stringify({
            post_slug: post.slug,
            post_title: post.title,
          }),
        }
      )

      if (!markSentResponse.ok) {
        const error = await markSentResponse.text()

        console.error(
          `Unable to record ${post.slug} as sent:`,
          error
        )

        return NextResponse.json(
          {
            error: 'Newsletter was sent but tracking failed.',
            post: post.slug,
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter sent successfully.',
      postsSent: newPosts.length,
      emailsSent: totalSent,
      posts: newPosts.map((post) => post.slug),
    })
  } catch (error) {
    console.error('Newsletter cron error:', error)

    return NextResponse.json(
      { error: 'Newsletter job failed.' },
      { status: 500 }
    )
  }
}
