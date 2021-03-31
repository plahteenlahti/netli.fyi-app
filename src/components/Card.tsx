import React, { FC } from 'react'
import styled from 'styled-components/native'

type Props = {
  style?: any
}

export const Card: FC<Props> = ({ children, style }) => {
  return <Container style={style}>{children}</Container>
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 8px 16px;
  margin: 0px 8px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
  elevation: 3;
`
