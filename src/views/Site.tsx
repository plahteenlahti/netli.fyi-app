import { RouteProp } from '@react-navigation/native'
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl
} from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { BuildSettings } from '../components/BuildSettings'
import { ScrollViewWithHero } from '../components/common/ScrollViewWithHero'
import { DeploysPreview } from '../components/DeploysPreview'
import { NoPreview } from '../components/NoPreview'
import { HooksPreview } from '../components/previews/hook'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { Text } from '../components/text/Text'
import { useDeploys } from '../hooks/deploy'
import { useHooks } from '../hooks/hook'
import { useSite } from '../hooks/site'
import { useSubmissions } from '../hooks/submissions'
import { SiteNavigation } from '../navigators/SitesStack'

type Props = NativeStackScreenProps<SiteNavigation, 'Site'>

export const Site = ({ route }: Props) => {
  const [init, setInit] = useState(false)

  const { siteID, name } = route.params
  const { data: site, isLoading, refetch, isSuccess, isError } = useSite(siteID)
  const { data: deploys } = useDeploys(siteID)
  const { data: submissions } = useSubmissions(siteID)
  const { data: hooks } = useHooks(siteID)

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

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
    <Container>
      <ScrollViewWithHero
        source={{ uri: site?.screenshot_url }}
        refreshControl={
          <RefreshControl
            refreshing={init ? isLoading : false}
            onRefresh={refetch}
          />
        }>
        <Content>
          <List
            data={sections}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderItem}
          />

          <SiteInformation site={site} name={name} />

          <BuildSettings site={site} />
          {deploys && deploys?.length > 0 ? (
            <DeploysPreview siteID={siteID} siteName={name} deploys={deploys} />
          ) : null}

          {hooks && hooks?.length > 0 ? (
            <HooksPreview siteID={siteID} siteName={name} hooks={hooks} />
          ) : null}

          {submissions && submissions?.length > 0 ? (
            <SubmissionsPreview
              siteID={siteID}
              siteName={name}
              submissions={submissions}
            />
          ) : null}
        </Content>
      </ScrollViewWithHero>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const List = styled(FlatList as new () => FlatList<string>)`
  padding: 0px 16px;
`

const Section = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: ${({ theme }) => theme.spacing(1)}px;
`

const Content = styled.View`
  background-color: ${({ theme }) => theme.primaryBackground};
`
