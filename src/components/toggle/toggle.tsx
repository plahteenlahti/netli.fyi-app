import { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

type Props = {
  selected: boolean
}

export const Toggle: FC<Props> = ({ selected }) => {
  const scale = useSharedValue(0)

  useEffect(() => {
    selected ? (scale.value = 0.95) : (scale.value = 0)
  }, [selected, scale])

  const animatedStyles = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [{ scale: withSpring(scale.value) }]
    }
  })

  return (
    <Container>
      <Circle style={animatedStyles} />
    </Container>
  )
}

const Container = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.secondaryBackground};
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`

const Circle = styled(Animated.View)`
  height: 16px;
  width: 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.accentColor};
`
