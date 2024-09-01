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
import { GradientText } from '../GradientText'

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
  renderItem,
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
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <Animated.View
              className="mb-12 pl-2"
              style={[largeTitleStyle, s.largeTitleContainer, { paddingTop }]}>
              <GradientText className="text-4xl font-bold">
                {title}
              </GradientText>
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
          <View className="flex-1 justify-center items-center">
            <GradientText className="text-base font-medium">
              {title}
            </GradientText>
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
