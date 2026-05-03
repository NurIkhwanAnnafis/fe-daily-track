import dayjs from 'dayjs'

export const formatDate = (date: Date | string | null | undefined, format: string = 'DD MMM YYYY HH:mm') => {
  if (!date) return '-'

  return dayjs(date).format(format)
}