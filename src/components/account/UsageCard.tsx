import React from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

const getBarWidth = (val: number, max: number, min: number) => {
  const normalized = (val - min) / (max - min)
  if (normalized < 0.05) {
    return '5%'
  } else {
    return normalized * 100 + '%'
  }
}

type Props = {
  max: number
  min: number
  value: number
  title: string
}

export const UsageCard = ({ max, min, value, title }: Props) => {
  return (
    <VContainer>
      <DataText>{title}</DataText>
      <ProgressBarOuter>
        <ProgressBarInner
          style={{
            width: getBarWidth(value, max, min)
          }}
        />
      </ProgressBarOuter>
    </VContainer>
  )
}

const VContainer = styled.View`
  flex: 1;
`

const DataText = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
`

const ProgressBarOuter = styled.View`
  height: 4px;
  border-radius: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const ProgressBarInner = styled(Animated.View)`
  border-radius: 4px;
  height: 100%;
  background-color: ${({ theme }) => theme.accentColor};
`
