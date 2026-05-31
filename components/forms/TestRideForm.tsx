'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import type { TestRideFormData } from '@/types'
import { useI18n } from '@/lib/i18n'
import { scooters } from '@/data/scooters'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name:          z.string().min(2),
  email:         z.string().email(),
  phone:         z.string().min(10),
  city:          z.string().min(2),
  model:         z.string().min(1),
  preferredDate: z.string().min(1),
  message:       z.string().optional(),
})

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Faisalabad', 'Multan', 'Other']

export default function TestRideForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors } } = useForm<TestRideFormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: TestRideFormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/book-ride', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-14 h-14 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-space font-bold text-white mb-2">All Set!</h3>
        <p className="text-muted">{t.testRide.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t.testRide.name} error={errors.name?.message}>
          <input {...register('name')}  placeholder="Ali Khan" className={inputCls} />
        </Field>
        <Field label={t.testRide.phone} error={errors.phone?.message}>
          <input {...register('phone')} placeholder="+92 300 0000000" className={inputCls} />
        </Field>
      </div>

      <Field label={t.testRide.email} error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="ali@example.com" className={inputCls} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t.testRide.city} error={errors.city?.message}>
          <select {...register('city')} className={inputCls}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={t.testRide.date} error={errors.preferredDate?.message}>
          <input
            {...register('preferredDate')}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={t.testRide.model} error={errors.model?.message}>
        <select {...register('model')} className={inputCls}>
          <option value="">Select a model</option>
          {scooters.map((s) => (
            <option key={s.id} value={`${s.brand} ${s.name}`}>{s.brand} {s.name}</option>
          ))}
        </select>
      </Field>

      <Field label={t.testRide.message}>
        <textarea {...register('message')} rows={3} placeholder="Anything you'd like us to know?" className={`${inputCls} resize-none`} />
      </Field>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-danger text-sm">
          <AlertCircle className="w-4 h-4" /> {t.testRide.error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</> : t.testRide.submit}
      </Button>
    </form>
  )
}

const inputCls =
  'w-full bg-[#060608] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-colors'

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}
