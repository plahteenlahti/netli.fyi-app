import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Build } from '../../typings/netlify'
import { Text } from '../text/Text'

type Props = {
  build: Build
}

export const BuildItem: FC<Props> = ({ build }) => {
  const domain = build.custom_domain ? build.custom_domain : build.subdomain

  return (
    <Container>
      {build.state === 'done' ? <Success /> : <Failure />}
      <Details>
        <Title>
          <Bold>{domain}: </Bold>
          <Normal>{build.context}</Normal>
        </Title>
        <Description>
          {!!build.committer && <Committer>{build.committer}: </Committer>}

          {build.title ?? 'No deploy message'}
        </Description>
      </Details>
    </Container>
  )
}

const Container = styled.View`
  background: ${({ theme }) => theme.secondaryBackground};
  padding: 8px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
  flex-direction: row;
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 14px;
  margin-bottom: 4px;
`

const Bold = styled(Text)`
  font-weight: bold;
`

const Normal = styled(Text)`
  font-weight: 400;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 12px;
`

const Committer = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.accentColor};
`

const Details = styled.View`
  margin-left: 8px;
`

const Success = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'check-circle',
  color: theme.successColor
}))`
  margin-top: 4px;
`

const Failure = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'exclamation-triangle',
  color: theme.errorColor
}))`
  margin-top: 4px;
`
