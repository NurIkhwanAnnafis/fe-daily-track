export function numberFormatter(
  value: number | undefined | null,
  locale: string,
  type?: 'normal' | 'decimal'
) {
  if (value === undefined) return '-'
  if (type === 'decimal') {
    return value
      ? new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }).format(value)
      : '0'
  }
  return value ? `Rp ${new Intl.NumberFormat(locale).format(value)}` : 'Rp 0'
}