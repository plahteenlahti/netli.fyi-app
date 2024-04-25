import { useState, useEffect } from 'react'
import { format, isToday, isYesterday, differenceInSeconds } from 'date-fns'

const getFormattedDate = (date: Date, now: Date): string => {
  const diffInSeconds = differenceInSeconds(now, date)

  if (diffInSeconds < 1) {
    return 'Just now'
  } else if (diffInSeconds === 1) {
    return '1 second ago'
  } else if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)} seconds ago`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`
  } else if (isToday(date)) {
    return format(date, 'HH:mm')
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'HH:mm')}`
  } else if (now.getTime() - date.getTime() < 24 * 3600 * 1000) {
    return `Yesterday at ${format(date, 'HH:mm')}`
  } else {
    return format(date, 'HH:mm dd.MM.yyyy')
  }
}

export const useTimeAgo = (date: Date): string => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const updateFrequency = (diffSeconds: number): number => {
      if (diffSeconds < 60) {
        return 1000
      } // Every second for the first minute
      if (diffSeconds < 3600) {
        return 60000
      } // Every minute for the first hour
      if (diffSeconds < 86400) {
        return 3600000
      } // Every hour for the first day
      return 86400000 // Every day thereafter
    }

    const diffSeconds = differenceInSeconds(now, date)
    const intervalId = setInterval(() => {
      setNow(new Date())
    }, updateFrequency(diffSeconds))

    return () => clearInterval(intervalId)
  }, [now, date])

  return getFormattedDate(date, now)
}

export default useTimeAgo
