import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Card } from './Card'
import { Text } from './text/Text'

export const AuthorizeCard: FC = () => {
  return (
    <Card>
      <Title>Authorize Netlify</Title>
    </Card>
  )
}

const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 17px;
  text-align: center;
`
