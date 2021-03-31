import React, { FC } from 'react'
import styled from 'styled-components/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Text } from './Typography'

type Props = {
  icon: string
  title: string
}

export const CardTitle: FC<Props> = ({ icon, title }) => {
  return (
    <Container>
      <ThemedIcon name={icon} size={15} solid />
      <Title type="Title 3">{title}</Title>
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 16px 8px;
`

const Title = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  margin: 8px 8px;
`

const ThemedIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``
