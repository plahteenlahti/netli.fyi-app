import {
  Duration,
  format,
  formatDuration,
  formatRelative,
  Locale
} from 'date-fns'
import { enUS, fi } from 'date-fns/locale'
import I18n from 'i18n-js'
import { isDate } from 'lodash'
import { I18nManager } from 'react-native'
import { findBestAvailableLanguage } from 'react-native-localize'

export const setI18nConfig = (): void => {
  const fallback = { languageTag: 'en', isRTL: false }

  const { languageTag, isRTL } =
    findBestAvailableLanguage(['fi', 'en']) || fallback
  I18nManager.forceRTL(isRTL)
  I18n.locale = languageTag
}

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
    ...options,
    locale: I18n.currentLocale() === 'fi' ? fi : enUS
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
    ...options,
    locale: I18n.currentLocale() === 'fi' ? fi : enUS
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
    ...options,
    locale: I18n.currentLocale() === 'fi' ? fi : enUS
  })
}
