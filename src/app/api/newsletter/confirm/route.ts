import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

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
        `&select=id,email,confirmed`,
      {
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
        'This confirmation link is invalid or has expired.',
        { status: 400 }
      )
    }

    if (!subscriber.confirmed) {
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
          }),
        }
      )

      if (!updateResponse.ok) {
        console.error(await updateResponse.text())

        return new NextResponse(
          'Unable to confirm your subscription.',
          { status: 500 }
        )
      }
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
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px;">
              <h1 style="color: #035AA6;">
                You're subscribed!
              </h1>

              <p style="font-size: 16px; line-height: 1.6;">
                Your Leading for Innovation subscription is confirmed.
                We'll send you new insights when they are published.
              </p>

              <p>
                <a
                  href="https://leadingforinnovation.com"
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
