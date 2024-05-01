import { styled } from 'nativewind'
import { Fragment, useCallback, useMemo, useState } from 'react'
import {
  LayoutChangeEvent,
  Text as RNText,
  StyleSheet,
  TextStyle,
  View
} from 'react-native'
import { Defs, LinearGradient, Stop, Svg, Text } from 'react-native-svg'
import colors from 'tailwindcss/colors'

interface Props {
  uppercase?: boolean
  textAlign?: TextStyle['textAlign']
  children: string
  gradientStart?: string
  gradientEnd?: string
  style?: TextStyle[][]
}

export const _GradientText = ({
  children,
  style,
  gradientStart = colors.gray[800],
  gradientEnd = colors.gray[400]
}: Props) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }, [])

  // the style returned from styled() is an array containging an array of styles
  const properties: TextStyle = Object.assign({}, ...(style?.flat() ?? []))

  // react-native-svg Text does not support uppercase
  const text =
    properties.textTransform === 'uppercase' ? children.toUpperCase() : children

  return (
    <Fragment>
      {/* Renders a hidden text element to calculate the width and height needed for the Svg element.
      This is done so that the GradientText aligns vertically with Text elements,
      and also so it grows horizontally for longer texts */}
      <View style={hiddenStyles.container} onLayout={onLayout}>
        <RNText aria-hidden style={[style, hiddenStyles.text]}>
          {text}
        </RNText>
      </View>
      <Svg
        aria-label={children}
        role="heading"
        height={dimensions.height}
        width={dimensions.width}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor={gradientStart} />
            <Stop offset="100%" stopColor={gradientEnd} />
          </LinearGradient>
        </Defs>
        <Text
          dy="25%"
          fill="url(#gradient)"
          fontFamily={properties.fontFamily}
          fontSize={properties.fontSize}
          fontWeight={properties.fontWeight}
          x="0"
          y="50%">
          {text}
        </Text>
      </Svg>
    </Fragment>
  )
}

export const GradientText = styled(_GradientText, {
  baseClassName: 'font-display'
})

const hiddenStyles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  text: {
    opacity: 0
  }
})
