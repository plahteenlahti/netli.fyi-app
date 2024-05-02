import { formatDuration, intervalToDuration } from 'date-fns'
import { Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Build } from '../../typings/netlify'

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
  const domain = build.custom_domain ? build.custom_domain : build.subdomain

  return (
    <View className="bg-white px-1 py-2 border-b border-b-gray-200 flex-row">
      {build.state === 'done' ? <Success /> : <Failure />}
      <Details>
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
      </Details>
    </View>
  )
}

const Committer = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.accentColor};
`

const Details = styled.View`
  margin-left: 8px;
`

const Success = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'check-circle',
  color: theme.successColor
}))`
  margin-top: 4px;
`

const Failure = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'exclamation-triangle',
  color: theme.errorColor
}))`
  margin-top: 4px;
`
