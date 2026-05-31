'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import type { OrderFormData, ScooterColor } from '@/types'
import { useI18n } from '@/lib/i18n'
import { scooters } from '@/data/scooters'
import { Button } from '@/components/ui/Button'

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

interface Props {
  preselectedModel?:  string
  preselectedColors?: ScooterColor[]
  onSuccess?:         () => void
}

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Faisalabad', 'Multan', 'Other']

export default function OrderForm({ preselectedModel, preselectedColors, onSuccess }: Props) {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const selectedModel = preselectedModel ?? ''
  const colorsForModel = preselectedColors
    ?? scooters.find((s) => `${s.brand} ${s.name}` === selectedModel)?.colors
    ?? []

  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(schema),
    defaultValues: { model: selectedModel, quantity: 1 },
  })

  const watchedModel = watch('model')
  const currentColors =
    preselectedColors ??
    scooters.find((s) => `${s.brand} ${s.name}` === watchedModel)?.colors ??
    []

  async function onSubmit(data: OrderFormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
        <p className="text-white font-semibold">{t.order.success}</p>
        <p className="text-xs text-muted mt-2">{t.order.note}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label={t.order.name}  error={errors.name?.message}>
          <input {...register('name')}  placeholder="Ali Khan" className={inputCls} />
        </Field>
        <Field label={t.order.phone} error={errors.phone?.message}>
          <input {...register('phone')} placeholder="+92 300 0000000" className={inputCls} />
        </Field>
      </div>

      <Field label={t.order.email} error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="ali@example.com" className={inputCls} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t.order.city} error={errors.city?.message}>
          <select {...register('city')} className={inputCls}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={t.order.quantity} error={errors.quantity?.message}>
          <input {...register('quantity', { valueAsNumber: true })} type="number" min={1} max={10} className={inputCls} />
        </Field>
      </div>

      <Field label={t.order.address} error={errors.address?.message}>
        <input {...register('address')} placeholder="House No, Street, Area" className={inputCls} />
      </Field>

      {!preselectedModel && (
        <Field label={t.order.model} error={errors.model?.message}>
          <select {...register('model')} className={inputCls}>
            <option value="">Select model</option>
            {scooters.map((s) => (
              <option key={s.id} value={`${s.brand} ${s.name}`}>{s.brand} {s.name}</option>
            ))}
          </select>
        </Field>
      )}

      <Field label={t.order.color} error={errors.color?.message}>
        <select {...register('color')} className={inputCls}>
          <option value="">Select colour</option>
          {currentColors.map((c) => (
            <option key={c.hex} value={c.name}>{c.name}</option>
          ))}
        </select>
      </Field>

      <Field label={t.order.message}>
        <textarea {...register('message')} rows={3} placeholder="Any special requests…" className={`${inputCls} resize-none`} />
      </Field>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-danger text-sm">
          <AlertCircle className="w-4 h-4" /> {t.order.error}
        </div>
      )}

      <div className="text-xs text-muted mb-2">{t.order.note}</div>

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : t.order.submit}
      </Button>
    </form>
  )
}

const inputCls =
  'w-full bg-[#060608] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-colors'

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}
