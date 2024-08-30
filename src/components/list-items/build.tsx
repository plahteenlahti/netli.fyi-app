import { formatDuration, intervalToDuration } from 'date-fns'
import { Text, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Build } from '@typings/netlify'
import { formatUrl } from '@utilities/url'

type Props = {
  build: Build
}

const buildTimeToMinutes = (buildTime: number) => {
  const duration = intervalToDuration({ start: 0, end: buildTime * 1000 })

  const formatted = formatDuration(duration, {
    format: ['minutes', 'seconds']
  })
  return formatted
}

export const BuildItem = ({ build }: Props) => {
  const domain = formatUrl(build.custom_domain ?? build.subdomain)

  return (
    <View className="bg-white px-2 py-2 border-b border-b-gray-200 flex-row gap-1 ">
      {build.state === 'done' ? (
        <FontAwesome5Icon name="check-circle" />
      ) : (
        <FontAwesome5Icon name="exclamation-triangle" />
      )}
      <View className="mr-2 flex-1">
        <Text className="text-gray-800 text-xs mb-1">
          <Text>{domain}: </Text>
          <Text>{build.context}</Text>
        </Text>
        <Text className="text-xs text-gray-600">
          Deployed in {buildTimeToMinutes(build.deploy_time)}
        </Text>
        <Text
          className="text-xs text-gray-600"
          ellipsizeMode="tail"
          numberOfLines={1}>
          {!!build.committer && (
            <Text className="text-blue-500">{build.committer}: </Text>
          )}
          {build.title ?? 'No deploy message'}
        </Text>
      </View>
    </View>
  )
}
