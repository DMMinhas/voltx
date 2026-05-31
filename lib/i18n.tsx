'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Language } from '@/types'
import en from './translations/en'
import ur from './translations/ur'

type Translations = typeof en

interface I18nContext {
  lang: Language
  t: Translations
  setLang: (l: Language) => void
  isRtl: boolean
}

const I18nCtx = createContext<I18nContext>({
  lang: 'en',
  t: en,
  setLang: () => {},
  isRtl: false,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const t = lang === 'ur' ? ur : en
  const isRtl = lang === 'ur'

  return (
    <I18nCtx.Provider value={{ lang, t, setLang, isRtl }}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-urdu' : 'font-sans'}>
        {children}
      </div>
    </I18nCtx.Provider>
  )
}

export function useI18n() {
  return useContext(I18nCtx)
}
