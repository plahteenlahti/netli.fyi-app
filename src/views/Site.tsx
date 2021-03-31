import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { Dimensions, Platform, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSite, getSiteDeploys, getSiteSubmissions } from '../api/netlify'
import { BuildSettings } from '../components/BuildSettings'
import { DeploysPreview } from '../components/DeploysPreview'
import { NoPreview } from '../components/NoPreview'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { RootStackParamList } from '../navigators/SiteStack'
import { RootState } from '../store/reducers'

const { width } = Dimensions.get('window')

type SiteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Site'>
type SiteScreenRouteProp = RouteProp<RootStackParamList, 'Site'>

type Props = {
  navigation: SiteScreenNavigationProp
  route: SiteScreenRouteProp
}

export const Site: FC<Props> = ({ route }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const [init, setInit] = useState(false)

  const { siteID, name } = route.params
  const { data: site, isLoading, refetch, isSuccess, isError } = useQuery(
    ['site', { siteID, accessToken }],
    getSite
  )
  const { data: deploys } = useQuery(
    ['deploys', { siteID, accessToken }],
    getSiteDeploys
  )

  const { data: submissions } = useQuery(
    ['submissions', { siteID, accessToken }],
    getSiteSubmissions
  )

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
