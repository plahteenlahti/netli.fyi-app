import React from 'react'
import { Dimensions, useWindowDimensions, Image as RNImage } from 'react-native'
import styled from 'styled-components/native'
import { NoPreview } from '../NoPreview'
import {
  Skia,
  Image,
  vec,
  rrect,
  rect,
  Circle,
  Box,
  Canvas,
  Group,
  RadialGradient,
  useValue,
  useSharedValueEffect,
  useComputedValue,
  useImage,
  Shadow,
  interpolate,
  Extrapolate,
  Mask
} from '@shopify/react-native-skia'
import {
  SensorType,
  useAnimatedReaction,
  useAnimatedSensor,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { processTransform3d, toMatrix3 } from 'react-native-redash'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

type Props = {
  screenshot_url: undefined | string
}

export const degreeToRad = (degree: number) => {
  'worklet'
  return degree * (Math.PI / 180)
}

export const SitePreview = ({
  screenshot_url = 'https://via.placeholder.com/336x210'
}: Props) => {
  const lightX = useValue(0)
  const lightY = useValue(0)
  const rotateX = useValue(0)
  const rotateY = useValue(0)
  const roll = useSharedValue(0)
  const pitch = useSharedValue(0)
  const image = useImage(screenshot_url)
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, { interval: 1 })

  const newWidth = screenWidth - 32
  const imageH = 210
  const imageW = 336

  const newHeight = newWidth * (imageH / imageW)
  const width = screenWidth - 32
  const height = newHeight
  const y = 100
  const x = (screenWidth - width) / 2

  const lightXOrigin = screenWidth / 2
  const lightYOrigin = (height + y) / 2

  useAnimatedReaction(
    () => animatedSensor.sensor.value,
    s => {
      pitch.value = s.pitch
      roll.value = s.roll
    },
    []
  )

  useSharedValueEffect(
    () => {
      lightX.current = interpolate(
        roll.value,
        [-Math.PI, Math.PI],
        [-500 * 2, 500 * 2]
      )

      lightY.current = interpolate(
        pitch.value,
        [-Math.PI, Math.PI],
        [-500 * 2, 500 * 2]
      )

      rotateY.current = interpolate(
        roll.value,
        [-Math.PI, Math.PI],
        [degreeToRad(40), degreeToRad(-40)],
        Extrapolate.CLAMP
      )

      rotateX.current = interpolate(
        pitch.value,
        [-Math.PI, Math.PI],
        [degreeToRad(40), degreeToRad(-40)],
        Extrapolate.CLAMP
      )
    },
    roll,
    pitch
  )

  const transform = useComputedValue(
    () => [{ translateX: lightX.current }, { translateY: lightY.current }],
    [lightX, lightY]
  )

  const matrix = useComputedValue(() => {
    const mat3 = toMatrix3(
      processTransform3d([
        { perspective: 300 },
        { rotateY: rotateY.current },
        { rotateX: rotateX.current }
      ])
    )

    return Skia.Matrix(mat3)
  }, [rotateX, rotateY])

  return (
    <PreviewContainer>
      <Canvas
        style={{
          height: height + 100 + y,
          width: screenWidth
        }}>
        <Group origin={{ x: width / 2, y: screenHeight / 2 }} matrix={matrix}>
          <Mask
            clip
            mask={
              <Box box={rrect(rect(x, y, width, height), 8, 8)}>
                <Shadow dx={12} dy={12} blur={25} color="white" />
              </Box>
            }>
            <Box
              box={rrect(rect(x, y, width, height), 8, 8)}
              color="rgba(255,255,255,0.5)">
              <Shadow dx={8} dy={8} blur={32} color="rgba(0, 0, 0, 0.1 )" />
              <Shadow dx={4} dy={8} blur={16} color="rgba(0, 0, 0, 0.3)" />
            </Box>

            {/* Image */}
            <Group clip={rrect(rect(x, y, width, height), 8, 8)}>
              {!!image && (
                <Image
                  image={image}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rect={rect(x, y, width, height)}
                />
              )}
            </Group>
            {/* Light */}
            <Group
              origin={vec(lightXOrigin, lightYOrigin)}
              transform={transform}
              blendMode="plus">
              <Circle cy={lightYOrigin} cx={lightXOrigin} r={256}>
                <RadialGradient
                  c={vec(lightXOrigin, lightYOrigin)}
                  r={128}
                  mode="clamp"
                  colors={[
                    'rgba(255,255,255,0.3)',
                    'rgba(255,255,255,0.2)',
                    'rgba(255,255,255,0.01)'
                  ]}
                />
              </Circle>
            </Group>
          </Mask>
        </Group>
      </Canvas>

      {/* {screenshot_url ? (
        <Preview
          resizeMode="contain"
          source={{ uri: screenshot_url }}
          height={undefined}
        />
      ) : (
        <NoSitePreview />
      )} */}
    </PreviewContainer>
  )
}

const Preview = styled.Image`
  width: 100%;
  height: ${(screenWidth - 2 * 16 - 2 * 8) * 0.625}px;
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: 8px;
  overflow: hidden;
`

const PreviewContainer = styled.View`
  flex: 1;
`

const NoSitePreview = styled(NoPreview)`
  height: ${(screenWidth - 2 * 16 - 2 * 8) * 0.625}px;
`
