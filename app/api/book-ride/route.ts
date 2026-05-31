import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendTestRideEmail } from '@/lib/email'

const schema = z.object({
  name:          z.string().min(2),
  email:         z.string().email(),
  phone:         z.string().min(10),
  city:          z.string().min(2),
  model:         z.string().min(1),
  preferredDate: z.string().min(1),
  message:       z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    await sendTestRideEmail(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[book-ride]', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
