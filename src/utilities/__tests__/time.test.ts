import {
  localizedFormat,
  localizedDuration,
  localizedRelativeFormat,
  ensureMinLoadingTime
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

describe('ensureMinLoadingTime', () => {
  jest.useFakeTimers() // Mock the timers

  it('should resolve the promise and wait for the minimum time if promise resolves too fast', async () => {
    const mockPromise = Promise.resolve('result')
    const minTime = 2000

    const promise = ensureMinLoadingTime(mockPromise, minTime)

    // Fast-forward time by less than the minTime to simulate fast promise resolution
    jest.advanceTimersByTime(1000)

    // Ensure the promise hasn't resolved yet since minTime hasn't passed
    expect(await Promise.race([promise, Promise.resolve('not yet')])).toBe(
      'not yet'
    )

    // Fast-forward time to the minTime
    jest.advanceTimersByTime(1000)

    // Now the promise should resolve
    const result = await promise
    expect(result).toBe('result')
  })

  it('should resolve immediately if the promise takes longer than the minimum time', async () => {
    const mockPromise = new Promise(resolve => {
      setTimeout(() => resolve('delayed result'), 3000)
    })
    const minTime = 2000

    const promise = ensureMinLoadingTime(mockPromise, minTime)

    // Fast-forward time by 3000ms to simulate slow promise resolution
    jest.advanceTimersByTime(3000)

    const result = await promise
    expect(result).toBe('delayed result')

    // Ensure no extra delay after promise resolution
    jest.advanceTimersByTime(1000) // Fast-forward some extra time to ensure no additional wait.
  })

  it('should not wait if the promise resolves after the minimum time', async () => {
    const mockPromise = new Promise(resolve =>
      setTimeout(() => resolve('result'), 2500)
    )
    const minTime = 2000

    const promise = ensureMinLoadingTime(mockPromise, minTime)

    // Fast-forward time beyond the time taken by the promise (2500ms)
    jest.advanceTimersByTime(2500)

    const result = await promise
    expect(result).toBe('result')

    // No need to assert setTimeout calls; we just need to ensure the result is returned after the actual promise time.
  })
})
