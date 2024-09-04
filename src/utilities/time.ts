import {
  Duration,
  format,
  formatDuration,
  FormatDurationOptions,
  FormatOptions,
  formatRelative,
  FormatRelativeOptions,
  intervalToDuration
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
  baseDate: Date | number = new Date(),
  options?: FormatRelativeOptions
) => {
  if (!isDate(date)) {
    return '-'
  }
  return formatRelative(date, baseDate, options)
}

export const ensureMinLoadingTime = async (
  promise: Promise<any>,
  minTime: number
): Promise<any> => {
  const start = Date.now()
  const result = await promise
  const end = Date.now()
  const timeElapsed = end - start
  const remainingTime = minTime - timeElapsed

  if (remainingTime > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingTime))
  }

  return result
}

export const buildTimeToMinutes = (buildTime: number) => {
  const duration = intervalToDuration({ start: 0, end: buildTime * 1000 })

  const formatted = formatDuration(duration, {
    format: ['minutes', 'seconds']
  })
  return formatted
}
