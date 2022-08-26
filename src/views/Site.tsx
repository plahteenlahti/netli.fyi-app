import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useEffect, useState } from 'react'
import { Dimensions, Platform, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { BuildSettings } from '../components/BuildSettings'
import { DeploysPreview } from '../components/DeploysPreview'
import { NoPreview } from '../components/NoPreview'
import { HooksPreview } from '../components/previews/hook'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { useDeploys } from '../hooks/deploy'
import { useHooks } from '../hooks/hook'
import { useSite } from '../hooks/site'
import { useSubmissions } from '../hooks/submissions'
import { SiteNavigation } from '../navigators/SitesStack'

const { width } = Dimensions.get('window')

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Site'>
type Route = RouteProp<SiteNavigation, 'Site'>

type Props = {
  navigation: Navigation
  route: Route
}

export const Site: FC<Props> = ({ route }) => {
  const [init, setInit] = useState(false)

  const { siteID, name } = route.params
  const { data: site, isLoading, refetch, isSuccess, isError } = useSite(siteID)
  const { data: deploys } = useDeploys(siteID, { per_page: 3 })
  const { data: submissions } = useSubmissions(siteID)
  const { data: hooks } = useHooks(siteID)

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

  return (
    <Container
      edges={
        Platform.OS === 'ios' ? ['top', 'right', 'left'] : ['right', 'left']
      }>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        refreshControl={
          <RefreshControl
            refreshing={init ? isLoading : false}
            onRefresh={refetch}
          />
        }>
        <Card>
          <PreviewContainer>
            {site?.screenshot_url ? (
              <SitePreview
                resizeMode="contain"
                source={{ uri: site?.screenshot_url }}
                height={undefined}
              />
            ) : (
              <NoSitePreview />
            )}
          </PreviewContainer>
        </Card>

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
      </ScrollView>
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
  flex: 1;
`

const Card = styled.View`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 16px 16px;
  margin: 8px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
  elevation: 2;
`

const SitePreview = styled.Image`
  width: 100%;
  height: ${(width - 2 * 16 - 2 * 8) * 0.625}px;
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: 8px;
  overflow: hidden;
`

const PreviewContainer = styled.View`
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`

const NoSitePreview = styled(NoPreview)`
  height: ${(width - 2 * 16 - 2 * 8) * 0.625}px;
`
