import { BlurView } from '@react-native-community/blur'
import { FlatListProps, RefreshControl, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Defs,
  LinearGradient,
  Mask,
  Rect,
  Stop,
  Svg,
  Text,
  Use
} from 'react-native-svg'

type Props<T> = {
  refreshing: boolean
  onRefresh: () => void
  extraElement?: React.ReactNode
  withLogo?: boolean
  title: string
} & FlatListProps<T>

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const HEADER_HEIGHT = 30
const HEADER_PADDING = 16

export const AnimatedFlatList = <T,>({
  title,
  extraElement,
  refreshing,
  onRefresh,
  withLogo,
  ...rest
}: Props<T>) => {
  const { top } = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const largeTitleStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [top, -60], [1, 1.3], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP
    })

    return {
      transform: [{ scale }]
    }
  })

  const headerBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 0, top], [0, 0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP
    })

    const borderBottomColor = interpolateColor(
      scrollY.value,
      [0, top],
      ['rgba(0,0,0,1)', 'rgba(0,0,0,1)']
    )

    return {
      opacity,
      borderBottomColor
    }
  })

  const paddingTop = HEADER_HEIGHT + HEADER_PADDING + top

  return (
    <View className="flex-1">
      <Animated.FlatList
        className="bg-white"
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <Animated.View
              className="mb-12 pl-2"
              style={[largeTitleStyle, s.largeTitleContainer, { paddingTop }]}>
              <Svg height={30} width={80} viewBox="0 0 800 300">
                <Defs>
                  <LinearGradient
                    id="Gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="300">
                    <Stop offset="0" stopColor="white" stopOpacity="0.8" />
                    <Stop offset="1" stopColor="white" stopOpacity="1" />
                  </LinearGradient>
                  <Mask
                    id="Mask"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="800"
                    height="300">
                    <Rect
                      x="0"
                      y="0"
                      width="800"
                      height="300"
                      fill="url(#Gradient)"
                    />
                  </Mask>
                  <Text
                    id="Text"
                    x="400"
                    y="200"
                    fontFamily="Verdana"
                    fontSize="100"
                    textAnchor="middle">
                    Netli.fyi
                  </Text>
                </Defs>
                <Use href="#Text" fill="#333" mask="url(#Mask)" />
              </Svg>

              <Animated.Text
                className={`text-3xl font-display font-semibold text-gray-800 ${
                  !!extraElement && 'ml-2'
                }`}>
                {title}
              </Animated.Text>
            </Animated.View>
          </>
        }
        {...rest}
      />
      <AnimatedBlurView
        blurType="light"
        className="absolute top-0 left-0 right-0 px-4"
        style={[
          {
            paddingTop: top,
            height: top + HEADER_HEIGHT + HEADER_PADDING,
            borderBottomWidth: StyleSheet.hairlineWidth
          },
          headerBgStyle
        ]}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1 justify-center">
            <TouchableOpacity />
          </View>
          <View className="flex-1">
            <Animated.Text className="text-gray-800 font-medium text-base">
              {title}
            </Animated.Text>
          </View>
          <View className="flex-1 flex-row-reverse items-center">
            {extraElement}
          </View>
        </View>
      </AnimatedBlurView>
    </View>
  )
}

const s = StyleSheet.create({
  largeTitleContainer: {
    transformOrigin: 'left top'
  }
})
