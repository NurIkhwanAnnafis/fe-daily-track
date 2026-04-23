import { extendTailwindMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

const customTailwind = extendTailwindMerge({})

export const cx = (...inputValues: ClassValue[]) => {
  return customTailwind(clsx(inputValues))
}