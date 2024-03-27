import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import styled from 'styled-components/native'
import { BuildSettings } from '../components/BuildSettings'
import { DeploysPreview } from '../components/DeploysPreview'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { ScrollViewWithHero } from '../components/common/ScrollViewWithHero'
import { HooksPreview } from '../components/previews/hook'
import { Text } from '../components/text/Text'
import { useDeploys } from '../hooks/deploy'
import { useHooks } from '../hooks/hook'
import { useSite } from '../hooks/site'
import { useSubmissions } from '../hooks/submissions'
import { RootStackParamList } from '../navigators/RootStack'

type Props = NativeStackScreenProps<RootStackParamList, 'Site'>

export const Site = ({
  route: {
    params: { siteID, name }
  }
}: Props) => {
  const {
    data: site,
    isRefetching,
    refetch,
    isSuccess,
    isError
  } = useSite(siteID)
  const { data: deploys } = useDeploys(siteID)
  const { data: submissions } = useSubmissions(siteID)
  const { data: hooks } = useHooks(siteID)

  const sections = [
    'site information',
    'build settings',
    'deploys',
    'web hooks'
  ]

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <Section key={item}>
      <Text type="subtitle"> {item}</Text>
    </Section>
  )

  return (
    <View className="flex-1">
      <ScrollViewWithHero
        source={{ uri: site?.screenshot_url }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }>
        <Content>
          <FlatList
            data={sections}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderItem}
          />

          <SiteInformation site={site} name={name} />
          <BuildSettings site={site} />

          {deploys && deploys?.length > 0 && (
            <DeploysPreview siteID={siteID} siteName={name} deploys={deploys} />
          )}

          {hooks && hooks?.length > 0 && (
            <HooksPreview siteID={siteID} siteName={name} hooks={hooks} />
          )}

          {submissions && submissions?.length > 0 && (
            <SubmissionsPreview
              siteID={siteID}
              siteName={name}
              submissions={submissions}
            />
          )}
        </Content>
      </ScrollViewWithHero>
    </View>
  )
}

const Section = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: ${({ theme }) => theme.spacing(1)}px;
`

const Content = styled.View`
  background-color: ${({ theme }) => theme.primaryBackground};
`
