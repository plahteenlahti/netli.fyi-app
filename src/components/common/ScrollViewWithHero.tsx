import React from 'react'
import {
  ImageRequireSource,
  RefreshControlProps,
  StyleProp,
  useWindowDimensions,
  ViewStyle
} from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { widthBreakpoints } from '../../utilities/screen'

const MAX_IMAGE_SCALE_FACTOR = 3
const DEFAULT_MAX_IMAGE_HEIGHT = 240
const NEGATIVE_BOTTOM_MARGIN = 48

type Props = {
  source: Source | ImageRequireSource
  children?: React.ReactNode
  backgroundColor?: string
  imageHeight?: number
  maxImageScaleFactor?: number
  scrollViewStyle?: StyleProp<ViewStyle>
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>
  refreshControl?: React.ReactElement<RefreshControlProps>
  defaultHeaderHeight?: number
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled'
  keyboardDismissMode?: 'none' | 'interactive' | 'on-drag'
}

export const HEADER_HEIGHT = widthBreakpoints<number>({
  narrow: 65,
  normal: 70
})

export const ScrollViewWithHero = ({
  source,
  children,
  refreshControl,
  backgroundColor,
  imageHeight = DEFAULT_MAX_IMAGE_HEIGHT,
  scrollViewStyle,
  scrollViewContentContainerStyle,
  defaultHeaderHeight,
  keyboardShouldPersistTaps,
  keyboardDismissMode
}: Props) => {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    }
  })
  const _defaultHeaderHeight =
    typeof defaultHeaderHeight === 'number'
      ? defaultHeaderHeight
      : HEADER_HEIGHT + insets.top
  const scrollViewMarginTop = source ? imageHeight : _defaultHeaderHeight

  const imageScale = interpolate(
    scrollY.value,
    [-height * 0.66, -NEGATIVE_BOTTOM_MARGIN, 0],
    [MAX_IMAGE_SCALE_FACTOR, 1, 1],
    Extrapolation.CLAMP
  )

  const imageOverlayOpacity = interpolate(
    scrollY.value,
    [0, imageHeight * 0.6],
    [0, 1],
    Extrapolation.CLAMP
  )

  return (
    <Container>
      <ImageContainer
        style={{
          height: imageHeight,
          transform: [
            { translateY: -imageHeight / 2 },
            { scale: imageScale },
            { translateY: imageHeight / 2 }
          ]
        }}>
        <FastImage
          source={source}
          style={{
            width,
            height: imageHeight
          }}
        />
        <Overlay
          style={{
            opacity: imageOverlayOpacity
          }}
        />
      </ImageContainer>
      <AnimatedScrollView
        style={scrollViewStyle}
        refreshControl={refreshControl}
        scrollEventThrottle={16}
        keyboardDismissMode={keyboardDismissMode}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[
          {
            marginTop: scrollViewMarginTop,
            paddingBottom: scrollViewMarginTop,
            backgroundColor,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },
          scrollViewContentContainerStyle
        ]}
        onScroll={handler}>
        {children}
      </AnimatedScrollView>
    </Container>
  )
}

const Container = styled(Animated.View)`
  flex: 1;
`

const ImageContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const AnimatedScrollView = styled(Animated.ScrollView)``
