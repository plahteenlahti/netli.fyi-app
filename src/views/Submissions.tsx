import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSiteSubmissions } from '../api/netlify'
import { SubmissionItem } from '../components/SubmissionItem'
import { RootStackParamList } from '../navigators/SiteStack'
import { RootState } from '../store/reducers'
import { Submission } from '../typings/netlify.d'

type SiteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Submissions'
>
type SiteScreenRouteProp = RouteProp<RootStackParamList, 'Submissions'>

type Props = {
  navigation: SiteScreenNavigationProp
  route: SiteScreenRouteProp
}

export const Submissions: FC<Props> = ({ navigation, route }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const { siteID } = route.params

  const { data: submissions } = useQuery(
    ['submissions', { siteID, accessToken }],
    getSiteSubmissions
  )

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
