import { useMemo } from 'react'
import { DimensionValue } from 'react-native'

/**
 * Defines the dimension values for spacing such as margin and padding.
 * - `number`: A single numeric value applied to all sides.
 * - `'auto'`: A string value 'auto' that applies automatic spacing based on the layout engine.
 * - `` `${number}%` ``: A percentage value as a string to apply a relative spacing.
 * - `[all]`: A tuple with a single DimensionValue, applied uniformly to all sides.
 * - `[vertical, horizontal]`: A tuple defining vertical and horizontal spacing.
 *   The first value applies to top and bottom, the second to left and right.
 * - `[top, horizontal, bottom]`: A tuple defining top, horizontal, and bottom spacing.
 *   The first value is for top, the second for left and right, and the third for bottom.
 * - `[top, right, bottom, left]`: A tuple defining spacing for all four sides individually.
 */
export type DimensionType =
  | DimensionValue
  | [DimensionValue]
  | [DimensionValue, DimensionValue]
  | [DimensionValue, DimensionValue, DimensionValue]
  | [DimensionValue, DimensionValue, DimensionValue, DimensionValue]

type SpacingType = 'margin' | 'padding'

export const useSpacingStyle = (
  spacing?: DimensionType,
  type: SpacingType = 'margin'
) => {
  return useMemo(() => {
    const style: Partial<Record<string, DimensionValue>> = {}

    if (
      spacing === null ||
      spacing === 'auto' ||
      typeof spacing === 'number' ||
      typeof spacing === 'string'
    ) {
      style[type] = spacing
    } else if (Array.isArray(spacing)) {
      const sides = ['Top', 'Right', 'Bottom', 'Left']
      const keys =
        spacing.length === 2
          ? [0, 1, 0, 1] // Vertical, Horizontal
          : spacing.length === 3
          ? [0, 1, 2, 1] // Top, Horizontal, Bottom
          : spacing.length === 4
          ? [0, 1, 2, 3] // Top, Right, Bottom, Left
          : [0] // Default to first item for all if spacing is single value

      keys.forEach((key, index) => {
        const property = `${type}${sides[index]}`
        style[property] = spacing[key]
      })
    }

    return style
  }, [spacing, type])
}
