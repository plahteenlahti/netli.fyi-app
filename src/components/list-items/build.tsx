import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Build } from '../../typings/netlify'
import { Text } from '../text/Text'
import { View } from 'react-native'

type Props = {
  build: Build
}

export const BuildItem: FC<Props> = ({ build }) => {
  const domain = build.custom_domain ? build.custom_domain : build.subdomain

  return (
    <View className="bg-white px-1 py-2 border-b border-b-gray-200 flex-row">
      {build.state === 'done' ? <Success /> : <Failure />}
      <Details>
        <Text className="text-gray-800 text-xs mb-1">
          <Bold>{domain}: </Bold>
          <Normal>{build.context}</Normal>
        </Text>
        <Description>
          {!!build.committer && <Committer>{build.committer}: </Committer>}

          {build.title ?? 'No deploy message'}
        </Description>
      </Details>
    </View>
  )
}

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
