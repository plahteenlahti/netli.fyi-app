import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Linking, RefreshControl, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '../components/Card'
import { DataField } from '../components/DataField'
import { useDeploy } from '../hooks/deploy'
import { RootStackParamList } from '../navigators/RootStack'
import { Deploy as TypeDeploy } from '../typings/netlify.d'

type Key = keyof TypeDeploy

const makeRow = (key: Key, value: unknown) => {
  return <DataField key={key} title={key as string} value={value} />
}

type MarkdownSegment = {
  content: string
  link?: string
}

function extractContentAndLinks(markdown?: string): MarkdownSegment[] {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  let lastIndex = 0
  let match
  const segments: MarkdownSegment[] = []

  if (!markdown) {
    return segments
  }

  while ((match = regex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      const contentSegment: MarkdownSegment = {
        content: markdown.substring(lastIndex, match.index)
      }
      segments.push(contentSegment)
    }
    const linkSegment: MarkdownSegment = {
      content: match[1],
      link: match[2]
    }
    segments.push(linkSegment)
    lastIndex = regex.lastIndex
  }

  if (lastIndex < markdown.length) {
    const finalContentSegment: MarkdownSegment = {
      content: markdown.substring(lastIndex)
    }
    segments.push(finalContentSegment)
  }

  return segments
}

export const Deploy = ({
  route: {
    params: { buildID }
  }
}: NativeStackScreenProps<RootStackParamList, 'Deploy'>) => {
  const { data, isRefetching, refetch } = useDeploy(buildID)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }>
      <CardTitle>Deploy summary</CardTitle>
      <Summary>
        {data?.summary?.messages?.map(message => {
          const links = extractContentAndLinks(message.description)
          return (
            <View
              className="border-b border-b-gray-200 py-2"
              key={message.title}>
              <Text className="font-semibold text-gray-800 text-sm">
                {message.title}
              </Text>
              <Text className="text-sm">
                {links.map((segment, index) => {
                  if (segment.link) {
                    return (
                      <Text
                        className="text-blue-500 underline"
                        onPress={() => Linking.openURL(segment.link)}
                        key={index}>
                        {segment.content}
                      </Text>
                    )
                  }
                  return segment.content
                })}
              </Text>
            </View>
          )
        })}
        {data?.summary?.status === 'unavailable' ? (
          <Row>
            <Title>Error in deployment</Title>
            <Description>
              Netlify couldn’t deploy your site. Check out Netlify Build docs
              for tips on troubleshooting your build, or ask Netlify for
              debugging advice.
            </Description>
          </Row>
        ) : null}
      </Summary>

      <Card>
        {data
          ? Object.keys(data).map((value: string) => {
              const key = value as Key
              return makeRow(key, data[key])
            })
          : null}
      </Card>
    </ScrollView>
  )
}

const Summary = styled(Card)`
  min-height: 250px;
`

const Row = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`
const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
  font-weight: 500;
  margin-bottom: 4px;
`
const Description = styled(Text)`
  color: ${({ theme }) => theme.secondaryTextColor};
`

const CardTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`
