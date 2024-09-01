import {
  localizedFormat,
  localizedDuration,
  localizedRelativeFormat
} from '../time'
import { format, formatDuration, formatRelative } from 'date-fns'
import isDate from 'lodash/isDate'

jest.mock('lodash/isDate')
jest.mock('date-fns', () => ({
  format: jest.fn(),
  formatDuration: jest.fn(),
  formatRelative: jest.fn()
}))

describe('localizedFormat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return formatted date when a valid date is provided', () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    isDate.mockReturnValue(true)
    format.mockReturnValue('formatted-date')

    const result = localizedFormat(dateValue, 'yyyy-MM-dd')
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(format).toHaveBeenCalledWith(dateValue, 'yyyy-MM-dd', undefined)
    expect(result).toBe('formatted-date')
  })

  it('should return "-" when an invalid date is provided', () => {
    isDate.mockReturnValue(false)

    const result = localizedFormat('invalid-date', 'yyyy-MM-dd')
    expect(isDate).toHaveBeenCalledWith('invalid-date')
    expect(format).not.toHaveBeenCalled()
    expect(result).toBe('-')
  })
})

describe('localizedDuration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return formatted duration', () => {
    const duration = { hours: 1, minutes: 30 }
    formatDuration.mockReturnValue('1 hour 30 minutes')

    const result = localizedDuration(duration)
    expect(formatDuration).toHaveBeenCalledWith(duration, {})
    expect(result).toBe('1 hour 30 minutes')
  })

  it('should return formatted duration with options', () => {
    const duration = { hours: 1, minutes: 30 }
    const options = { format: ['hours', 'minutes'], zero: true }
    formatDuration.mockReturnValue('01:30')

    const result = localizedDuration(duration, options)
    expect(formatDuration).toHaveBeenCalledWith(duration, options)
    expect(result).toBe('01:30')
  })
})

describe('localizedRelativeFormat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return relative formatted date when a valid date is provided', () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    isDate.mockReturnValue(true)
    formatRelative.mockReturnValue('3 days ago')

    const result = localizedRelativeFormat(dateValue)
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(formatRelative).toHaveBeenCalledWith(
      dateValue,
      expect.any(Date),
      undefined
    )
    expect(result).toBe('3 days ago')
  })

  it('should return "-" when an invalid date is provided', () => {
    isDate.mockReturnValue(false)

    const result = localizedRelativeFormat('invalid-date')
    expect(isDate).toHaveBeenCalledWith('invalid-date')
    expect(formatRelative).not.toHaveBeenCalled()
    expect(result).toBe('-')
  })

  it('should use provided baseDate and options', () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    const baseDate = new Date('2024-08-28T09:35:34.845548+00:00')
    const options = { locale: 'en-US' }
    isDate.mockReturnValue(true)
    formatRelative.mockReturnValue('1 day ago')

    const result = localizedRelativeFormat(dateValue, baseDate, options)
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(formatRelative).toHaveBeenCalledWith(dateValue, baseDate, options)
    expect(result).toBe('1 day ago')
  })
})
