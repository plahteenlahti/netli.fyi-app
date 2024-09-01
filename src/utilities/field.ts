import isDate from 'lodash/isDate'
import { localizedRelativeFormat } from './time'

type Field = 'url' | 'date' | 'boolean'

export const getField = (
  value: string | boolean | number | Date,
  field: Field
) => {
  switch (field) {
    case 'date':
      return isDate(value)
        ? localizedRelativeFormat(new Date(value), new Date())
        : ''
    case 'url':
      return isDate(value)
        ? localizedRelativeFormat(new Date(value), new Date())
        : ''

    default:
      return ''
  }
}
