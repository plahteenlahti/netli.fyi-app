import {
  Duration,
  format,
  formatDuration,
  FormatDurationOptions,
  FormatOptions,
  formatRelative,
  FormatRelativeOptions
} from 'date-fns'
import isDate from 'lodash/isDate'

export const localizedFormat = (
  date: Date | number,
  f: string,
  options?: FormatOptions
): string => {
  if (!isDate(date)) {
    return '-'
  }
  return format(date, f, options)
}

export const localizedDuration = (
  duration: Duration,
  options?: FormatDurationOptions
): string => {
  return formatDuration(duration, {
    ...options
  })
}

export const localizedRelativeFormat = (
  date: Date | number,
  baseDate: Date | number,
  options?: FormatRelativeOptions
) => {
  if (!isDate(date)) {
    return '-'
  }
  return formatRelative(date, baseDate, options)
}
