import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'

type Props = {
  style?: any
}

export const NoPreview: FC<Props> = ({ style }) => {
  return (
    <Container style={style}>
      <IconBrowser size={25} name="safari" brands />
    </Container>
  )
}

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.54);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.primaryTextColor
}))``
