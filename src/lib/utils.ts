import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTypeValue = (
  array: String[],
  type: 'Installation' | 'Repair',
) => {
  return array.find(tag => tag === type)
}

export const locations = [
  'Burnaby',
  'Coquitlam',
  'Delta',
  'Langley',
  'Maple Ridge',
  'New Westminster',
  'North Vancouver',
  'Pitt Meadows',
  'Richmond',
  'Surrey',
  'Vancouver',
  'White Rock',
]

export const getLocationValue = (
  array: String[],
  type:
    | 'Burnaby'
    | 'Coquitlam'
    | 'Delta'
    | 'Langley'
    | 'Maple Ridge'
    | 'New Westminster'
    | 'North Vancouver'
    | 'Pitt Meadows'
    | 'Richmond'
    | 'Surrey'
    | 'Vancouver'
    | 'White Rock',
) => {
  return array.find(tag => tag === type)
}

export const getPostLocationTag = (
  tags: Array<string>,
  locations: Array<string>,
) => {
  let workLocation
  for (let tag of tags) {
    if (locations.includes(tag)) {
      workLocation = tag
      break
    }
  }
  return workLocation
}
