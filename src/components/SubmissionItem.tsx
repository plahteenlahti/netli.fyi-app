import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Submission } from '../typings/netlify.d'
import { Text } from './Typography'

type Props = {
  submission: Submission
  navigate: () => void
}

export const SubmissionItem: FC<Props> = ({ submission, navigate }) => {
  return (
    <Button onPress={navigate}>
      <Container>
        <Sender>{submission.email}</Sender>
        <Branch type="Caption 2">{submission?.body?.substr(0, 50)}...</Branch>
      </Container>
      <Chevron name="chevron-right" size={15} solid />
    </Button>
  )
}

const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
  padding: 8px 0px;
  flex: 1;
`

const Branch = styled(Text)``

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Sender = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``
