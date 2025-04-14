// src/types/global.d.ts

interface Window extends window {
  clarity?: (eventName: string, eventData?: Record<string, any>) => void
}
