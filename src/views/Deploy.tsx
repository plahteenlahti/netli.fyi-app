import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getDeploy } from '../api/netlify'
import { RootStackParamList } from '../navigators/RootStack'
import { RootState } from '../store/reducers'
import { Card } from '../components/Card'
import { Text } from '../components/Typography'
import { DataField } from '../components/DataField'
import { Deploy as TypeDeploy } from '../typings/netlify.d'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Platform, RefreshControl } from 'react-native'

type DeployScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Deploy'
>
type DeployRouteProp = RouteProp<RootStackParamList, 'Deploy'>

type Props = {
  navigation: DeployScreenNavigationProp
  route: DeployRouteProp
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
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const [init, setInit] = useState(false)

  const { data, isLoading, refetch, isSuccess, isError } = useQuery(
    ['build', { buildID, accessToken }],
    getDeploy
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
        <CardTitle type="Title 3">Deploy summary</CardTitle>
        <Summary>
          {data?.summary?.messages?.map((message) => (
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
