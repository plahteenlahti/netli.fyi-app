import {
  Duration,
  format,
  formatDuration,
  formatRelative,
  Locale
} from 'date-fns'
import I18n from 'i18n-js'
import isDate from 'lodash/isDate'

export const localizedFormat = (
  date: Date | number,
  f: string,
  options?: {
    locale?: Locale
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: number
    useAdditionalWeekYearTokens?: boolean
    useAdditionalDayOfYearTokens?: boolean
  }
): string => {
  if (!isDate(date)) {
    return '-'
  }
  return format(date, f, {
    ...options
  })
}

export const localizedDuration = (
  duration: Duration,
  options?: {
    format?: string[]
    zero?: boolean
    delimiter?: string
    locale?: Locale
  }
): string => {
  return formatDuration(duration, {
    ...options
  })
}

export const localizedRelativeFormat = (
  date: Date | number,
  baseDate: Date | number,
  options?: {
    locale?: Locale
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  }
) => {
  if (!isDate(date)) {
    return '-'
  }
  return formatRelative(date, baseDate, {
    ...options
  })
}
