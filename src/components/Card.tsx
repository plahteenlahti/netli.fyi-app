import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  style?: ViewStyle
  padding?: boolean
}

export const Card: FC<Props> = ({ children, style, padding = true }) => {
  return (
    <Container padding={padding} style={style}>
      {children}
    </Container>
  )
}

const Container = styled.View<Props>`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: ${({ padding }) => (padding ? ' 8px 16px' : '0px')};
  margin: 0px 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
  elevation: 3;
`
