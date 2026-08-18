import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return new NextResponse(
        'Invalid unsubscribe link.',
        { status: 400 }
      )
    }

    const lookupResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/newsletter_subscribers` +
        `?unsubscribe_token=eq.${encodeURIComponent(token)}` +
        `&select=id,email,unsubscribed_at`,
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
        'Unable to process your unsubscribe request.',
        { status: 500 }
      )
    }

    const rows = await lookupResponse.json()
    const subscriber = rows[0]

    if (!subscriber) {
      return new NextResponse(
        'This unsubscribe link is invalid.',
        { status: 400 }
      )
    }

    if (!subscriber.unsubscribed_at) {
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
            confirmed: false,
            unsubscribed_at: new Date().toISOString(),
          }),
        }
      )

      if (!updateResponse.ok) {
        console.error(await updateResponse.text())

        return new NextResponse(
          'Unable to unsubscribe you right now.',
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
            <title>Unsubscribed</title>
          </head>
          <body style="font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px;">
              <h1 style="color: #035AA6;">
                You're unsubscribed
              </h1>

              <p style="font-size: 16px; line-height: 1.6;">
                You will no longer receive new Leading for Innovation
                newsletter emails.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Changed your mind? You can always subscribe again from
                the Leading for Innovation website.
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
    console.error('Newsletter unsubscribe error:', error)

    return new NextResponse(
      'Something went wrong while unsubscribing.',
      { status: 500 }
    )
  }
}
