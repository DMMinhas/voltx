import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendOrderEmail } from '@/lib/email'

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  phone:    z.string().min(10),
  city:     z.string().min(2),
  address:  z.string().min(5),
  model:    z.string().min(1),
  color:    z.string().min(1),
  quantity: z.number().min(1).max(10),
  message:  z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    await sendOrderEmail(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[order]', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
