import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { DeployItem } from '../components/DeployItem'
import { useDeploys } from '../hooks/deploy'
import { SiteNavigation } from '../navigators/SitesStack'
import { Deploy } from '../typings/netlify.d'

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Deploys'>
type Route = RouteProp<SiteNavigation, 'Deploys'>

type Props = {
  navigation: Navigation
  route: Route
}

export const Deploys: FC<Props> = ({ route, navigation }) => {
  const { siteID } = route.params
  const { data: deploys } = useDeploys(siteID)

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
