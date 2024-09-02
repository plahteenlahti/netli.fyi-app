import { BlurView } from '@react-native-community/blur'
import {
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  Text,
  View
} from 'react-native'
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import colors from 'tailwindcss/colors'

type Props = {
  children: React.ReactNode
  refreshing: boolean
  onRefresh: () => void
  extraElement?: React.ReactNode
  goBack?: () => void
  title: string
} & ScrollViewProps

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const HEADER_HEIGHT = 30
const HEADER_PADDING = 16

export const AnimatedScrollView = ({
  title,
  extraElement,
  goBack,
  children,
  refreshing,
  onRefresh,
  ...rest
}: Props) => {
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
  const ellipsedTitle = title.length > 16 ? `${title.slice(0, 16)}...` : title

  const hasRefreshControl =
    typeof onRefresh !== 'undefined' && typeof refreshing !== 'undefined'

  return (
    <View className="flex-1">
      <Animated.ScrollView
        onScroll={scrollHandler}
        refreshControl={
          hasRefreshControl ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        {...rest}>
        <View style={{ paddingTop, marginBottom: 50 }}>
          {!!goBack && (
            <TouchableOpacity
              onPress={goBack}
              className="ml-2 mb-2 bg-gray-200 rounded-full h-9 w-9 justify-center items-center">
              <FontAwesome5
                color={colors.gray[700]}
                name="chevron-left"
                size={20}
              />
            </TouchableOpacity>
          )}
          <Animated.View
            className="flex-row pl-2 mb-1"
            style={[largeTitleStyle, s.largeTitleContainer]}>
            {extraElement}
            {extraElement ? <View className="w-2" /> : null}
            <GradientText className="text-4xl font-bold">
              {ellipsedTitle}
            </GradientText>
          </Animated.View>
        </View>
        {children}
      </Animated.ScrollView>
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
            {goBack ? (
              <TouchableOpacity>
                <Text className="text-base font-medium">Back</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-base font-medium">{ellipsedTitle}</Text>
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
