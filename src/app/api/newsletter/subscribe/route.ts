import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_API_KEY = process.env.RESEND_API_KEY!

const SITE_URL = 'https://leadingforinnovation.com'
const FROM_EMAIL =
  'Leading for Innovation <newsletter@leadingforinnovation.com>'
const REPLY_TO = 'leadingforinnovation@gmail.com'

async function sendConfirmationEmail(
  email: string,
  confirmationToken: string,
  resubscribe = false
) {
  const confirmationUrl =
    `${SITE_URL}/api/newsletter/confirm?token=` +
    encodeURIComponent(confirmationToken)

  const introText = resubscribe
    ? 'You asked to subscribe again to Leading for Innovation.'
    : 'Thanks for signing up to receive new insights from Leading for Innovation.'

  const resendResponse = await fetch(
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
        to: [email],
        subject: 'Confirm your Leading for Innovation subscription',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1f2937;">
            <div style="background: #104d36; border-radius: 16px 16px 0 0; padding: 28px 32px;">
              <div style="font-size: 22px; font-weight: 700; color: #ffffff;">
                Leading for Innovation
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 16px 16px; padding: 32px;">
              <p style="font-size: 16px; line-height: 1.6;">
                ${introText}
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Click below to confirm your subscription.
              </p>

              <p style="margin: 30px 0;">
                <a
                  href="${confirmationUrl}"
                  style="display: inline-block; padding: 14px 22px; background: #035AA6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;"
                >
                  Confirm my subscription
                </a>
              </p>

              <p style="font-size: 13px; line-height: 1.5; color: #6b7280;">
                If you did not sign up for Leading for Innovation,
                you can safely ignore this email.
              </p>
            </div>
          </div>
        `,
      }),
    }
  )

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text()
    console.error('Resend error:', errorText)
    return false
  }

  return true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim().toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          email,
        }),
      }
    )

    if (insertResponse.ok) {
      const rows = await insertResponse.json()
      const subscriber = rows[0]

      if (!subscriber?.confirmation_token) {
        console.error('Missing confirmation token for new subscriber.')

        return NextResponse.json(
          { error: 'Unable to create confirmation link.' },
          { status: 500 }
        )
      }

      const emailSent = await sendConfirmationEmail(
        email,
        subscriber.confirmation_token
      )

      if (!emailSent) {
        return NextResponse.json(
          { error: 'Unable to send confirmation email.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message:
          'Please check your inbox for a confirmation email.',
      })
    }

    const errorText = await insertResponse.text()

    if (insertResponse.status !== 409) {
      console.error('Supabase insert error:', errorText)

      return NextResponse.json(
        { error: 'Unable to subscribe right now.' },
        { status: 500 }
      )
    }

    const existingResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers` +
        `?email=eq.${encodeURIComponent(email)}` +
        `&select=id,email,confirmed,confirmation_token,unsubscribe_token,unsubscribed_at`,
      {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )

    if (!existingResponse.ok) {
      console.error(await existingResponse.text())

      return NextResponse.json(
        { error: 'Unable to check your existing subscription.' },
        { status: 500 }
      )
    }

    const existingRows = await existingResponse.json()
    const existingSubscriber = existingRows[0]

    if (!existingSubscriber) {
      return NextResponse.json(
        { error: 'Unable to find your existing subscription.' },
        { status: 500 }
      )
    }

    if (
      existingSubscriber.confirmed &&
      !existingSubscriber.unsubscribed_at
    ) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed.',
      })
    }

    const newConfirmationToken = crypto.randomUUID()

    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers?id=eq.${existingSubscriber.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmed: false,
          confirmation_token: newConfirmationToken,
          unsubscribed_at: null,
          confirmed_at: null,
        }),
      }
    )

    if (!updateResponse.ok) {
      console.error(await updateResponse.text())

      return NextResponse.json(
        { error: 'Unable to restart your subscription.' },
        { status: 500 }
      )
    }

    const emailSent = await sendConfirmationEmail(
      email,
      newConfirmationToken,
      true
    )

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Unable to send confirmation email.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        'Please check your inbox for a confirmation email.',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
