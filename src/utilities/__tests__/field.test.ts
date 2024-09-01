import { getField } from '../field'
import isDate from 'lodash/isDate'
import { localizedRelativeFormat } from '../time'

jest.mock('lodash/isDate')
jest.mock('../time')

const isDateMock = isDate as jest.MockedFunction<typeof isDate>
const localizedRelativeFormatMock =
  localizedRelativeFormat as jest.MockedFunction<typeof localizedRelativeFormat>

describe('getField', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return localized relative format for 'date' field with a valid date", () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    isDateMock.mockReturnValue(true)
    localizedRelativeFormatMock.mockReturnValue('3 days ago')

    const result = getField(dateValue, 'date')
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(localizedRelativeFormat).toHaveBeenCalledWith(
      dateValue,
      expect.any(Date)
    )
    expect(result).toBe('3 days ago')
  })

  it("should return an empty string for 'date' field with an invalid date", () => {
    const invalidDateValue = 'not-a-date'
    isDateMock.mockReturnValue(false)

    const result = getField(invalidDateValue, 'date')
    expect(isDate).toHaveBeenCalledWith(invalidDateValue)
    expect(localizedRelativeFormat).not.toHaveBeenCalled()
    expect(result).toBe('')
  })

  it("should return localized relative format for 'url' field with a valid date", () => {
    const dateValue = new Date('2024-08-29T09:35:34.845548+00:00')
    isDateMock.mockReturnValue(true)
    localizedRelativeFormatMock.mockReturnValue('3 days ago')

    const result = getField(dateValue, 'url')
    expect(isDate).toHaveBeenCalledWith(dateValue)
    expect(localizedRelativeFormat).toHaveBeenCalledWith(
      dateValue,
      expect.any(Date)
    )
    expect(result).toBe('3 days ago')
  })

  it("should return an empty string for 'url' field with an invalid date", () => {
    const invalidDateValue = 'not-a-date'
    isDateMock.mockReturnValue(false)

    const result = getField(invalidDateValue, 'url')
    expect(isDate).toHaveBeenCalledWith(invalidDateValue)
    expect(localizedRelativeFormat).not.toHaveBeenCalled()
    expect(result).toBe('')
  })

  it('should return an empty string for an unsupported field', () => {
    const result = getField('some value', 'boolean')
    expect(result).toBe('')
  })
})
