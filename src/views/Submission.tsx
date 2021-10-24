import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSubmission } from '../api/netlify'
import { Card } from '../components/Card'
import { RootStackParamList } from '../navigators/RootStack'
import { RootState } from '../store/reducers'

type SiteScreenNavigationProp = StackNavigationProp<
  RootStackParamList['App']['SitesStack'],
  'Submission'
>
type SiteScreenRouteProp = RouteProp<
  RootStackParamList['App']['SitesStack'],
  'Submission'
>

type Props = {
  navigation: SiteScreenNavigationProp
  route: SiteScreenRouteProp
}

export const Submission: FC<Props> = ({ route }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const { submissionID } = route.params

  const { data: submission } = useQuery(
    ['submission', { submissionID, accessToken }],
    getSubmission
  )

  return (
    <Container>
      <ScrollView>
        <Card>
          <Row>
            <Title>Form</Title>
            <Description>{submission?.form_name}</Description>
          </Row>
          {submission?.ordered_human_fields?.map((field) => (
            <Row key={field.name}>
              <Title>{field.title}</Title>
              <Description>{field.value}</Description>
            </Row>
          ))}
        </Card>
      </ScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const ScrollView = styled.ScrollView``

const Row = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`
const Title = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-weight: 500;
  margin-bottom: 4px;
`
const Description = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  line-height: 20px;
`
