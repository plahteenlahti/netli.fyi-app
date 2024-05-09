import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { FlatList, ListRenderItem, View } from 'react-native'
import { SubmissionItem } from '@components/SubmissionItem'
import { useSubmissions } from '@hooks/submissions'
import { RootStackParamList } from '@navigators/RootStack'
import { Submission } from '@typings/netlify.d'

type Props = NativeStackScreenProps<RootStackParamList, 'Submissions'>

export const Submissions = ({ navigation, route }: Props) => {
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
