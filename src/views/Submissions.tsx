import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import styled from 'styled-components/native'
import { SubmissionItem } from '../components/SubmissionItem'
import { useSubmissions } from '../hooks/submissions'
import { SiteNavigation } from '../navigators/SitesStack'
import { Submission } from '../typings/netlify.d'

type Props = NativeStackScreenProps<SiteNavigation, 'Submissions'>

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
    <View className="bg:white">
      <FlatList className="px-4" data={submissions} renderItem={renderItem} />
    </View>
  )
}
