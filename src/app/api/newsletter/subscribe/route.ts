import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_API_KEY = process.env.RESEND_API_KEY!

const SITE_URL = 'https://leadingforinnovation.com'
const FROM_EMAIL = 'Leading for Innovation <newsletter@leadingforinnovation.com>'
const REPLY_TO = 'leadingforinnovation@gmail.com'

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

    const supabaseResponse = await fetch(
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

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text()

      if (supabaseResponse.status === 409) {
        return NextResponse.json({
          success: true,
          message:
            'Please check your inbox for a confirmation email.',
        })
      }

      console.error('Supabase error:', errorText)

      return NextResponse.json(
        { error: 'Unable to subscribe right now.' },
        { status: 500 }
      )
    }

    const rows = await supabaseResponse.json()
    const subscriber = rows[0]

    if (!subscriber?.confirmation_token) {
      console.error('Missing confirmation token.')
      return NextResponse.json(
        { error: 'Unable to create confirmation link.' },
        { status: 500 }
      )
    }

    const confirmationUrl =
      `${SITE_URL}/api/newsletter/confirm?token=` +
      encodeURIComponent(subscriber.confirmation_token)

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
              <h1 style="font-size: 28px; margin-bottom: 16px; color: #035AA6;">
                Leading for Innovation
              </h1>

              <p style="font-size: 16px; line-height: 1.6;">
                Thanks for signing up to receive new insights from
                Leading for Innovation.
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
          `,
        }),
      }
    )

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend error:', errorText)

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
