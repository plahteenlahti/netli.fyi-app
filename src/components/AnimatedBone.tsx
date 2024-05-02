import { FC, useCallback, useState } from 'react'
import { ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useLayout = () => {
  const [size, setSize] = useState<any>({ width: 0, height: 0 })

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

type Props = {
  animatedStyle?: ViewStyle
  style?: any
}

export const AnimatedBone = ({ animatedStyle, style }: Props) => {
  return (
    <Bone style={style}>
      <AnimationContainer style={[animatedStyle]}>
        <Gradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      </AnimationContainer>
    </Bone>
  )
}

const Bone = styled.View`
  overflow: hidden;
  background-color: ${({ theme }) => theme.bonePrimary};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.bonePrimary, theme.boneSecondary, theme.bonePrimary]
}))`
  flex: 1;
`

const AnimationContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
`
