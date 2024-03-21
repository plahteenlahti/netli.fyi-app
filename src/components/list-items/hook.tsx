import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Hook } from '../../typings/netlify.d'

type Props = {
  last: boolean
  hook: Hook
  navigate: () => void
}

export const HookItem = ({ last, hook, navigate }: Props) => {
  return (
    <TouchableOpacity
      className="py-2 flex-row items-center justify-between"
      onPress={navigate}
      key={hook?.id}>
      <IconContainer>
        {!hook?.success ? <Failure /> : <Success />}
      </IconContainer>
      <Column>
        <DeployText numberOfLines={1} lineBreakMode="clip">
          <Type>{hook.type}: </Type>
        </DeployText>
        <Text>{hook.actor}</Text>
      </Column>
      <Chevron name="chevron-right" size={15} solid />
    </TouchableOpacity>
  )
}

type ItemProps = {
  last: boolean
}

const DeployText = styled(Text)`
  padding-right: 16px;
  margin-bottom: 6px;
`

const Type = styled(Text)`
  font-weight: 500;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Column = styled.View`
  flex: 1;
  margin-left: 8px;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const Success = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'check-circle',
  color: theme.successColor
}))``

const Failure = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'exclamation-triangle',
  color: theme.errorColor
}))``

const IconContainer = styled.View`
  height: 100%;
  padding-top: 5px;
`
