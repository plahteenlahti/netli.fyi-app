import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Build } from '../../typings/netlify'
import { Text } from '../Typography'

type Props = {
  build: Build
}

export const BuildItem: FC<Props> = ({ build }) => {
  return (
    <Container>
      <Title>
        <Bold>{build.custom_domain}: </Bold>
        <Normal>{build.context}</Normal>
        <Status>{build.state}</Status>
      </Title>
      <Description>
        By <Committer>{build.committer}: </Committer>
        {build.title ?? 'No deploy message'}
      </Description>
    </Container>
  )
}

const Container = styled.View`
  background: ${({ theme }) => theme.secondaryBackground};
  padding: 8px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`

const Title = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 14px;
  margin-bottom: 4px;
`

const Bold = styled.Text`
  font-weight: bold;
`

const Normal = styled.Text`
  font-weight: 400;
`

const Status = styled.Text`
  color: ${({ theme }) => theme.successColor};
`

const Description = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 12px;
`

const Committer = styled.Text`
  color: ${({ theme }) => theme.accentColor};
`
