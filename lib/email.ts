import { Resend } from 'resend'
import type { TestRideFormData, OrderFormData, ContactFormData } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN = process.env.ADMIN_EMAIL ?? 'admin@voltx.pk'
const FROM  = process.env.FROM_EMAIL   ?? 'VOLTx <onboarding@resend.dev>'

function row(label: string, value: string | number) {
  return `<tr><td style="padding:6px 12px;color:#888;font-size:13px;">${label}</td><td style="padding:6px 12px;font-weight:600;">${value}</td></tr>`
}

function wrap(title: string, body: string) {
  return `
  <!DOCTYPE html><html><body style="margin:0;padding:0;background:#0D0D10;color:#F0F0F5;font-family:Inter,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#141418;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
    <div style="background:linear-gradient(135deg,#00FFCC22,#BBFF0011);padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px;">⚡ VOLTx</span>
      <h2 style="margin:8px 0 0;font-size:18px;font-weight:600;">${title}</h2>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">${body}</table>
    </div>
    <div style="padding:16px 32px;font-size:12px;color:#555;border-top:1px solid rgba(255,255,255,0.04);">
      VOLTx — Pakistan's Electric Future Starts Here · voltx.pk
    </div>
  </div></body></html>`
}

export async function sendTestRideEmail(data: TestRideFormData) {
  const body =
    row('Name', data.name) +
    row('Email', data.email) +
    row('Phone', data.phone) +
    row('City', data.city) +
    row('Model', data.model) +
    row('Preferred Date', data.preferredDate) +
    (data.message ? row('Message', data.message) : '')

  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `🛵 New Test Ride — ${data.model} (${data.city})`,
    html: wrap('New Test Ride Request', body),
  })
}

export async function sendOrderEmail(data: OrderFormData) {
  const body =
    row('Name', data.name) +
    row('Email', data.email) +
    row('Phone', data.phone) +
    row('City', data.city) +
    row('Address', data.address) +
    row('Model', data.model) +
    row('Colour', data.color) +
    row('Quantity', data.quantity) +
    (data.message ? row('Notes', data.message) : '')

  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `🛒 New Order — ${data.model} × ${data.quantity} (${data.city})`,
    html: wrap('New Order Inquiry', body),
  })
}

export async function sendContactEmail(data: ContactFormData) {
  const body =
    row('Name', data.name) +
    row('Email', data.email) +
    row('Subject', data.subject) +
    row('Message', data.message)

  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `📩 Contact: ${data.subject}`,
    html: wrap('Contact Form Submission', body),
  })
}
