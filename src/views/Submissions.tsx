import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SubmissionItem } from '../components/SubmissionItem'
import { useSubmissions } from '../hooks/submissions'
import { SiteNavigation } from '../navigators/SitesStack'
import { Submission } from '../typings/netlify.d'

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Deploys'>
type Route = RouteProp<SiteNavigation, 'Deploys'>

type Props = {
  navigation: Navigation
  route: Route
}

export const Submissions: FC<Props> = ({ navigation, route }) => {
  const { siteID } = route.params
  const { data: submissions } = useSubmissions(siteID)

  const renderItem: ListRenderItem<Submission> = ({ item: submission }) => {
    const navigate = () => {
      navigation.navigate('Submission', {
        name: `${submission?.name}`,
        submissionID: `${submission?.id}`
      })
    }
    return (
      <SubmissionItem
        navigate={navigate}
        key={submission.id}
        submission={submission}
      />
    )
  }

  return (
    <Container>
      <List data={submissions} renderItem={renderItem} />
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
`

const List = styled(FlatList as new () => FlatList<Submission>)`
  padding: 0px 16px;
`
