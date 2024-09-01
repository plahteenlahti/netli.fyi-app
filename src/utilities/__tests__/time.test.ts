import {
  localizedFormat,
  localizedDuration,
  localizedRelativeFormat
} from '../time'
import {
  format,
  formatDuration,
  FormatDurationOptions,
  formatRelative
} from 'date-fns'
import isDate from 'lodash/isDate'

jest.mock('lodash/isDate')
jest.mock('date-fns', () => ({
  format: jest.fn(),
  formatDuration: jest.fn(),
  formatRelative: jest.fn()
}))

const isDateMock = isDate as jest.MockedFunction<typeof isDate>
const formatRelativeMock = formatRelative as jest.MockedFunction<
  typeof formatRelative
>
const formatMock = format as jest.MockedFunction<typeof format>
const formatDurationMock = formatDuration as jest.MockedFunction<
  typeof formatDuration
>

describe('localizedFormat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return formatted date when a valid date is provided', () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    isDateMock.mockReturnValue(true)
    formatMock.mockReturnValue('formatted-date')

    const result = localizedFormat(dateValue, 'yyyy-MM-dd')
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(format).toHaveBeenCalledWith(dateValue, 'yyyy-MM-dd', undefined)
    expect(result).toBe('formatted-date')
  })

  it('should return "-" when an invalid date is provided', () => {
    isDateMock.mockReturnValue(false)

    //@ts-expect-error test invalid date
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
    formatDurationMock.mockReturnValue('1 hour 30 minutes')

    const result = localizedDuration(duration)
    expect(formatDuration).toHaveBeenCalledWith(duration, {})
    expect(result).toBe('1 hour 30 minutes')
  })

  it('should return formatted duration with options', () => {
    const duration = { hours: 1, minutes: 30 }
    const options = {
      format: ['hours', 'minutes'],
      zero: true
    } satisfies FormatDurationOptions
    formatDurationMock.mockReturnValue('01:30')

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
    isDateMock.mockReturnValue(true)
    formatRelativeMock.mockReturnValue('3 days ago')

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
    isDateMock.mockReturnValue(false)

    //@ts-expect-error test invalid date
    const result = localizedRelativeFormat('invalid-date')
    expect(isDate).toHaveBeenCalledWith('invalid-date')
    expect(formatRelative).not.toHaveBeenCalled()
    expect(result).toBe('-')
  })

  it('should use provided baseDate', () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    const baseDate = new Date('2024-08-28T09:35:34.845548+00:00')
    isDateMock.mockReturnValue(true)
    formatRelativeMock.mockReturnValue('1 day ago')

    const result = localizedRelativeFormat(dateValue, baseDate)
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(formatRelative).toHaveBeenCalledWith(dateValue, baseDate, undefined)
    expect(result).toBe('1 day ago')
  })
})
