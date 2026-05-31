export interface ScooterColor {
  name: string
  hex: string
}

export interface ScooterSpecs {
  topSpeed: number       // km/h
  range: number          // km
  motorPower: number     // Watts
  batteryType: string
  batteryCapacity: string
  chargeTime: number     // hours
  warranty: number       // months
  weight?: number        // kg
}

export interface Scooter {
  id: string
  slug: string
  name: string
  brand: 'Yadea' | 'Evee'
  tagline: string
  category: 'budget' | 'commuter' | 'premium' | 'performance'
  price: { min: number; max?: number }
  images: string[]
  colors: ScooterColor[]
  specs: ScooterSpecs
  features: string[]
  isNew?: boolean
  isFeatured?: boolean
  description: string
  sourceUrl: string
}

export interface Dealer {
  id: string
  name: string
  city: string
  address: string
  phone: string
  lat: number
  lng: number
  brands: ('Yadea' | 'Evee')[]
}

export interface TestRideFormData {
  name: string
  email: string
  phone: string
  city: string
  model: string
  preferredDate: string
  message?: string
}

export interface OrderFormData {
  name: string
  email: string
  phone: string
  city: string
  address: string
  model: string
  color: string
  quantity: number
  message?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type Language = 'en' | 'ur'
