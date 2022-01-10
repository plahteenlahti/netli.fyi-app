import React, { FC } from 'react'
import styled from 'styled-components/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Text } from './Typography'

type Props = {
  icon: string
  extra?: string
  title: string
}

export const CardTitle: FC<Props> = ({ icon, title, extra }) => {
  return (
    <Container>
      <Row>
        <ThemedIcon name={icon} size={15} solid />
        <Title type="Title 3">{title}</Title>
      </Row>

      {extra && <CardDetail>{extra}</CardDetail>}
    </Container>
  )
}

const Container = styled.View`
  padding: 0px 16px;
  margin: 16px 0px;
`

const Title = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 8px 8px;
`
const ThemedIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const CardDetail = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.secondaryTextColor};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
