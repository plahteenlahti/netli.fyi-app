import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useEffect, useState } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Card } from '../components/Card'
import { DataField } from '../components/DataField'
import { Text } from '../components/Typography'
import { useDeploy } from '../hooks/deploy'
import { SiteNavigation } from '../navigators/SitesStack'
import { Deploy as TypeDeploy } from '../typings/netlify.d'

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Deploy'>
type Route = RouteProp<SiteNavigation, 'Deploy'>

type Props = {
  navigation: Navigation
  route: Route
}

type Key = keyof TypeDeploy

const makeRow = (key: Key, value: unknown) => {
  return <DataField key={key as string} title={key as string} value={value} />
}

export const Deploy: FC<Props> = ({
  route: {
    params: { buildID }
  }
}) => {
  const [init, setInit] = useState(false)

  const { data, isLoading, refetch, isSuccess, isError } = useDeploy(buildID)

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
        <CardTitle type="Title 3">Deploy summary</CardTitle>
        <Summary>
          {data?.summary?.messages?.map(message => (
            <Row key={message.title}>
              <Title>{message.title}</Title>
              <Description>{message.description}</Description>
            </Row>
          ))}
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
    </Container>
  )
}

const Summary = styled(Card)`
  min-height: 250px;
`

const Container = styled(SafeAreaView)`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
`

const Row = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`
const Title = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-weight: 500;
  margin-bottom: 4px;
`
const Description = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
`

const CardTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`
