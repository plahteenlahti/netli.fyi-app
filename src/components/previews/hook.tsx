import { Hook } from '@typings/netlify'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from '../Card'
import { CardTitle } from '../CardTitle'
import { Text } from '../text/Text'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import colors from 'tailwindcss/colors'

type Props = {
  hooks?: Array<Hook>
  siteID: string
  siteName: string
}

const getIcon = (type: string) => {
  switch (type) {
    case 'github_app_commit_status':
      return 'code-branch'
    case 'github_app_checks':
      return 'code-branch'
    case 'email':
      return 'envelope'
    case 'github_app_review_comment':
      return 'comments'
    default:
      return 'code-branch'
  }
}

export const HooksPreview = ({ hooks }: Props) => {
  const shownHooks = hooks

  const rows = buildInfoRows(shownHooks)

  const goToDeploys = () => {}

  return (
    <>
      <CardTitle title="Web hooks" icon="code-branch" />
      <Card>
        {rows?.map(({ message, hook }) => {
          return (
            <View
              className="px-2 pt-3 pb-2 border-b border-b-gray-200 flex-1"
              key={hook.id}>
              <View className="flex-row gap-2 flex-1 mr-4">
                <FontAwesome5Icon
                  name={getIcon(hook.type)}
                  size={14}
                  color={colors.gray[400]}
                />
                <Text className="text-md font-normal tex">{message}</Text>
              </View>
            </View>
          )
        })}
        {hooks && hooks.length > 5 ? (
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

type HookInfo = {
  message: string
  hook: Hook
}

function buildInfoRows(events?: Hook[]): HookInfo[] | undefined {
  return events
    ?.map(event => {
      let message = ''

      switch (event.type) {
        case 'github_app_commit_status':
          switch (event.event) {
            case 'deploy_building':
              message =
                'Add deploy state commit checks when Deploy Preview starts'
              break
            case 'deploy_created':
              message =
                'Add deploy state commit checks when Deploy Preview succeeds'
              break
            case 'deploy_failed':
              message =
                'Add deploy state commit checks when Deploy Preview fails'
              break
            default:
              message = ''
          }
          break
        case 'github_app_checks':
          switch (event.event) {
            case 'deploy_building':
              message =
                'Add deploy summary commit checks when Deploy Preview starts'
              break
            case 'deploy_created':
              message =
                'Add deploy summary commit checks when Deploy Preview succeeds'
              break
            case 'deploy_failed':
              message =
                'Add deploy summary commit checks when Deploy Preview fails'
              break
            default:
              message = ''
          }
          break
        case 'email':
          switch (event.event) {
            case 'deploy_request_pending':
              message = `Email ${event.data.email} when deploy request is pending`
              break
            case 'deploy_request_accepted':
              message = `Email ${event.data.email} when deploy request is accepted`
              break
            case 'deploy_request_rejected':
              message = `Email ${event.data.email} when deploy request is rejected`
              break
            default:
              message = ''
          }
          break
        case 'github_app_review_comment':
          switch (event.event) {
            case 'deploy_request_pending':
              message =
                'Add Deploy Preview links to pull request comments when deploy request is pending'
              break
            case 'deploy_request_accepted':
              message =
                'Add Deploy Preview links to pull request comments when deploy request is accepted'
              break
            case 'deploy_request_rejected':
              message =
                'Add Deploy Preview links to pull request comments when deploy request is rejected'
              break
            default:
              message = ''
          }
          break
        default:
          message = ''
      }

      if (message) {
        return { message, hook: event }
      } else {
        return null
      }
    })
    .filter(row => row !== null) as HookInfo[]
}
