import React, { FC } from 'react'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { loop, useValue } from 'react-native-redash/lib/module/v1'
import styled from 'styled-components/native'
import { AnimatedBone } from './AnimatedBone'

const { useCode, set, cond, eq } = Animated

export const DEFAULT_EASING: Animated.EasingFunction = Easing.bezier(
  0.5,
  0,
  0.25,
  1
)
export const boneColor = '#E1E9EE'
export const highlightColor = '#F2F8FC'
export const DEFAULT_DURATION = 1200

type Props = {
  isLoading: boolean
}

export const SiteListItemSkeleton: FC<Props> = ({ isLoading }) => {
  const animationValue = useValue(0)
  const loading = useValue(isLoading ? 1 : 0)

  useCode(
    () =>
      cond(eq(loading, 1), [
        set(
          animationValue,
          loop({
            duration: DEFAULT_DURATION,
            easing: DEFAULT_EASING
          })
        )
      ]),
    [loading, animationValue]
  )

  const animatedStyle: any = {
    transform: [
      {
        translateX: interpolate(animationValue, {
          inputRange: [0, 1],
          outputRange: [-100, 100]
        })
      }
    ]
  }

  return (
    <Card>
      <PreviewSkeleton animatedStyle={animatedStyle} />
      <Column>
        <SiteNameSkeleton animatedStyle={animatedStyle} />
        <DomainSkeleton animatedStyle={animatedStyle} />
      </Column>
    </Card>
  )
}

const Card = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
  flex-direction: row;
  align-items: center;
`

const PreviewSkeleton = styled(AnimatedBone)`
  border-radius: 8px;
  overflow: hidden;
  height: 45px;
  width: 76px;
  background-color: ${({ theme }) => theme.bonePrimary};
`

const SiteNameSkeleton = styled(AnimatedBone)`
  border-radius: 4px;
  overflow: hidden;
  height: 17px;
  margin-bottom: 16px;
  width: 150px;
  background-color: ${({ theme }) => theme.bonePrimary};
`

const DomainSkeleton = styled(AnimatedBone)`
  overflow: hidden;
  border-radius: 4px;
  height: 12px;
  width: 250px;
  background-color: ${({ theme }) => theme.bonePrimary};
`

const Column = styled.View`
  flex: 1;
  padding-left: 16px;
`
