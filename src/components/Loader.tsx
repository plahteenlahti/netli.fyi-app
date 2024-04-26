import { useEffect } from 'react'
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle
} from 'react-native'
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

interface Props {
  style?: StyleProp<ViewStyle>
  disableAnimation?: boolean
  shadowWidth?: number
}

const DEFAULT_SHADOW_WIDTH = 150
export const LoadingView = ({
  style,
  disableAnimation,
  shadowWidth = DEFAULT_SHADOW_WIDTH
}: Props) => {
  const window = useWindowDimensions()
  const initialXValue = -window.width
  const translateX = useSharedValue(initialXValue)

  useEffect(() => {
    if (disableAnimation) {
      translateX.value = initialXValue
      return
    }

    translateX.value = withDelay(
      200,
      withRepeat(
        withTiming(window.width * 2, {
          duration: 1500
        }),
        0,
        false
      )
    )
  }, [disableAnimation, initialXValue, translateX, window])

  return (
    <View style={[s.loading, style]}>
      <Animated.View
        style={[
          s.shadow,
          {
            width: shadowWidth,
            transform: [{ translateX }, { skewX: '15deg' }]
          }
        ]}
      />
    </View>
  )
}

const s = StyleSheet.create({
  loading: {
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  shadow: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  }
})
