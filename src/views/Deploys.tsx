import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { DeployItem } from '../components/DeployItem'
import { useDeploys } from '../hooks/deploy'
import { SiteNavigation } from '../navigators/SitesStack'

import { Deploy } from '../typings/netlify.d'

export const Deploys = ({
  route,
  navigation
}: NativeStackScreenProps<SiteNavigation, 'Deploys'>) => {
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
