import { Dimensions } from 'react-native'

type Breakpoints = {
  extraNarrow?: any
  narrow?: any
  normal: any
  wide?: any
}

/**
 * Returns value for current breakpoint based on screen width. Defaults to `normal`.
 *  */
export function widthBreakpoints<T>({
  extraNarrow,
  narrow,
  normal,
  wide
}: Breakpoints): T {
  if (extraNarrow !== undefined && IS_EXTRA_NARROW_SCREEN) {
    return extraNarrow
  }
  if (narrow !== undefined && IS_NARROW_SCREEN) {
    return narrow
  }
  if (wide !== undefined && IS_WIDE_SCREEN) {
    return wide
  }
  return normal
}

/*
  Breakpoints are based on IOS screen sizes.
  https://28b.co.uk/ios-device-dimensions-reference-table/
*/

// Returns true if screen width is less than extra narrow break point
const IS_EXTRA_NARROW_SCREEN = Dimensions.get('window').width <= 320

// Returns true if screen width is less than narrow break point
const IS_NARROW_SCREEN = Dimensions.get('window').width <= 375

// Returns true if screen width is larger than wide breakpoint
const IS_WIDE_SCREEN = Dimensions.get('window').width >= 428
