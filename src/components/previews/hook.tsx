import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Hook } from '../../typings/netlify'
import { Card } from '../Card'
import { CardTitle } from '../CardTitle'
import { Text } from '../text/Text'
import { View } from 'react-native'
import { RootStackParamList } from '../../navigators/RootStack'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  hooks?: Array<Hook>
  siteID: string
  siteName: string
}

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Site'>

export const HooksPreview = ({ hooks }: Props) => {
  const navigation = useNavigation<Navigation>()
  const shownHooks = hooks?.slice(0, 5)

  const rows = buildInfoRows(shownHooks)

  const goToDeploys = () => {}

  return (
    <>
      <CardTitle title="Web hooks" icon="code-branch" />
      <Card>
        {rows?.map(hook => {
          // const navigate = () => {
          //   navigation.navigate('Hook', {
          //     name: siteName,
          //     hookID: hook?.id
          //   })
          // }

          return (
            <View key={hook}>
              <Text className="text-xs font-normal tex">{hook}</Text>
            </View>
          )
        })}
        {hooks && hooks?.length > 5 ? (
          <View>
            <TouchableOpacity
              className="flex items-center justify-center w-full h-12 bg-gray-100 rounded-md"
              onPress={goToDeploys}>
              <Text className="text-sm font-bold text-accent">Show more</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Card>
    </>
  )
}

function buildInfoRows(events?: Hook[]): string[] | undefined {
  return events
    ?.map(event => {
      switch (event.type) {
        case 'github_app_commit_status':
          switch (event.event) {
            case 'deploy_building':
              return 'Add deploy state commit checks when Deploy Preview starts'
            case 'deploy_created':
              return 'Add deploy state commit checks when Deploy Preview succeeds'
            case 'deploy_failed':
              return 'Add deploy state commit checks when Deploy Preview fails'
            default:
              return ''
          }
        case 'github_app_checks':
          switch (event.event) {
            case 'deploy_building':
              return 'Add deploy summary commit checks when Deploy Preview starts'
            case 'deploy_created':
              return 'Add deploy summary commit checks when Deploy Preview succeeds'
            case 'deploy_failed':
              return 'Add deploy summary commit checks when Deploy Preview fails'
            default:
              return ''
          }
        case 'email':
          switch (event.event) {
            case 'deploy_request_pending':
              return `Email ${event.data.email} when deploy request is pending`
            case 'deploy_request_accepted':
              return `Email ${event.data.email} when deploy request is accepted`
            case 'deploy_request_rejected':
              return `Email ${event.data.email} when deploy request is rejected`
            default:
              return ''
          }
        case 'github_app_review_comment':
          switch (event.event) {
            case 'deploy_request_pending':
              return 'Add Deploy Preview links to pull request comments when deploy request is pending'
            case 'deploy_request_accepted':
              return 'Add Deploy Preview links to pull request comments when deploy request is accepted'
            case 'deploy_request_rejected':
              return 'Add Deploy Preview links to pull request comments when deploy request is rejected'
            default:
              return ''
          }
        default:
          return ''
      }
    })
    .filter(row => row !== '')
}
