import { ReactNode } from 'react'
import { FlexStyle, StyleProp, View, ViewStyle } from 'react-native'
import { DimensionType, useSpacingStyle } from '../../hooks/useSpacing'

interface Props {
  spacing?: number
  justifyContent?: FlexStyle['justifyContent']
  alignItems?: FlexStyle['alignItems']
  style?: StyleProp<ViewStyle>
  reversed?: boolean
  children: ReactNode
  /** Optional margin applied around the component. Can be a single value or an array for specific sides. */
  margin?: DimensionType
  /** Optional padding applied inside the component. Can be a single value or an array for specific sides. */
  padding?: DimensionType
}

export const VStack = ({
  spacing = 0,
  style,
  children,
  justifyContent,
  reversed,
  alignItems,
  margin,
  padding
}: Props) => {
  const flexDirection = reversed ? 'column-reverse' : 'column'
  const marginStyle = useSpacingStyle(margin, 'margin')
  const paddingStyle = useSpacingStyle(padding, 'padding')

  return (
    <View
      style={[
        { flexDirection, justifyContent, alignItems, rowGap: spacing },
        marginStyle,
        paddingStyle,
        style
      ]}>
      {children}
    </View>
  )
}
