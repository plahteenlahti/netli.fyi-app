import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSiteDeploys } from '../api/netlify'
import { DeployItem } from '../components/DeployItem'
import { RootStackParamList } from '../navigators/SiteStack'
import { RootState } from '../store/reducers'
import { Deploy } from '../typings/netlify.d'

type SiteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Deploys'
>
type SiteScreenRouteProp = RouteProp<RootStackParamList, 'Deploys'>

type Props = {
  navigation: SiteScreenNavigationProp
  route: SiteScreenRouteProp
}

export const Deploys: FC<Props> = ({ route, navigation }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const { siteID } = route.params

  const { data: deploys } = useQuery(
    ['deploys', { siteID, accessToken }],
    getSiteDeploys
  )

  const renderItem: ListRenderItem<Deploy> = ({ item: deploy, index }) => {
    const navigate = () => {
      navigation.navigate('Deploy', {
        name: `${deploy?.name}`,
        buildID: `${deploy?.id}`
      })
    }

    return (
      <DeployItem
        last={index + 1 === deploys?.length}
        navigate={navigate}
        deploy={deploy}
        key={deploy?.id}
      />
    )
  }

  return (
    <Container>
      <List data={deploys} renderItem={renderItem} />
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
`

const List = styled(FlatList as new () => FlatList<Deploy>)`
  padding: 0px 16px;
`
