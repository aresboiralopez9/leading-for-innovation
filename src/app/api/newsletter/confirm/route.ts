import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_API_KEY = process.env.RESEND_API_KEY!

const SITE_URL = 'https://leadingforinnovation.com'
const FROM_EMAIL =
  'Leading for Innovation <newsletter@leadingforinnovation.com>'
const REPLY_TO = 'leadingforinnovation@gmail.com'

function buildWelcomeEmail(
  post: {
    title: string
    excerpt: string
    category: string
    slug: string
  },
  unsubscribeToken: string
) {
  const articleUrl = `${SITE_URL}/blog/${post.slug}`

  const unsubscribeUrl =
    `${SITE_URL}/api/newsletter/unsubscribe?token=` +
    encodeURIComponent(unsubscribeToken)

  return `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:40px 20px;">

        <div style="background:#104d36;border-radius:20px 20px 0 0;padding:30px 32px;">
          <div style="font-size:24px;font-weight:700;color:#ffffff;">
            Leading for Innovation
          </div>
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
            Welcome
          </p>

          <h1 style="
            margin:0 0 18px;
            font-size:36px;
            line-height:1.15;
            color:#12372a;
          ">
            You're in.
          </h1>

          <p style="
            margin:0 0 18px;
            font-size:17px;
            line-height:1.65;
            color:#4b5563;
          ">
            Thanks for subscribing to Leading for Innovation.
          </p>

          <p style="
            margin:0 0 30px;
            font-size:17px;
            line-height:1.65;
            color:#4b5563;
          ">
            To get you started, here is our latest research informed insight.
          </p>

          <div style="
            padding:24px;
            background:#f6f8f7;
            border-radius:14px;
            margin-bottom:30px;
          ">

            <p style="
              margin:0 0 12px;
              font-size:12px;
              line-height:1.4;
              font-weight:700;
              letter-spacing:2px;
              text-transform:uppercase;
              color:#3f8d70;
            ">
              ${post.category}
            </p>

            <h2 style="
              margin:0 0 14px;
              font-size:28px;
              line-height:1.2;
              color:#12372a;
            ">
              ${post.title}
            </h2>

            <p style="
              margin:0;
              font-size:16px;
              line-height:1.65;
              color:#4b5563;
            ">
              ${post.excerpt}
            </p>
          </div>

          <p style="margin:0 0 32px;">
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
          </p>

          <p style="
            margin:0;
            font-size:14px;
            line-height:1.6;
            color:#6b7280;
          ">
            We'll send you new insights as we publish them.
          </p>

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
            You're receiving this email because you subscribed to
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
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return new NextResponse(
        'Invalid confirmation link.',
        { status: 400 }
      )
    }

    const lookupResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers` +
        `?confirmation_token=eq.${encodeURIComponent(token)}` +
        `&select=id,email,confirmed,unsubscribe_token`,
      {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!lookupResponse.ok) {
      console.error(await lookupResponse.text())

      return new NextResponse(
        'Unable to confirm your subscription.',
        { status: 500 }
      )
    }

    const rows = await lookupResponse.json()
    const subscriber = rows[0]

    if (!subscriber) {
      return new NextResponse(
        'This confirmation link is invalid or has already been used.',
        { status: 400 }
      )
    }

    const posts = getAllPosts()
    const latestPost = posts[0]

    if (!latestPost) {
      return new NextResponse(
        'Your subscription is confirmed, but there are currently no published posts.',
        { status: 200 }
      )
    }

    const emailResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          reply_to: REPLY_TO,
          to: [subscriber.email],
          subject: `Welcome to Leading for Innovation: ${latestPost.title}`,
          html: buildWelcomeEmail(
            {
              title: latestPost.title,
              excerpt: latestPost.excerpt,
              category: latestPost.category,
              slug: latestPost.slug,
            },
            subscriber.unsubscribe_token
          ),
        }),
      }
    )

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Welcome email error:', errorText)

      return new NextResponse(
        'We confirmed your subscription, but could not send the welcome email. Please try again later.',
        { status: 500 }
      )
    }

    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers?id=eq.${subscriber.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmed: true,
          confirmed_at: new Date().toISOString(),
          confirmation_token: null,
        }),
      }
    )

    if (!updateResponse.ok) {
      console.error(await updateResponse.text())

      return new NextResponse(
        'Your welcome email was sent, but we could not finish activating your subscription.',
        { status: 500 }
      )
    }

    return new NextResponse(
      `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Subscription confirmed</title>
          </head>

          <body style="font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px;">

            <div style="
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 18px;
            ">

              <h1 style="color: #035AA6; margin-top: 0;">
                You're subscribed!
              </h1>

              <p style="font-size: 16px; line-height: 1.6;">
                Your Leading for Innovation subscription is confirmed.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                We just sent our latest article to your inbox.
              </p>

              <p>
                <a
                  href="${SITE_URL}"
                  style="color: #035AA6; font-weight: bold;"
                >
                  Return to Leading for Innovation
                </a>
              </p>

            </div>

          </body>
        </html>
      `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    )
  } catch (error) {
    console.error('Newsletter confirmation error:', error)

    return new NextResponse(
      'Something went wrong while confirming your subscription.',
      { status: 500 }
    )
  }
}
