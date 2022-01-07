import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { SiteListItem } from './components/SiteListItem'
// import { SiteListItemSkeleton } from './components/SiteListItemSkeleton'
import { useSites } from './hooks/site'
import { RootStackParamList } from './navigators/RootStack'
import { NetlifySite } from './typings/netlify.d'

type SitesScreenNavigationProp = StackNavigationProp<
  RootStackParamList['App']['Sites'],
  'Profile'
>
type SitesScreenRouteProp = RouteProp<
  RootStackParamList['App']['Sites'],
  'SiteList'
>

type Props = {
  navigation: SitesScreenNavigationProp
  route: SitesScreenRouteProp
}

const placeHolderItems = Array.from({ length: 10 }, (v, i) => i).map(
  (_, index) => ({
    key: `${index}`,
    custom_domain: 'domain',
    default_domain: 'default'
  })
)

export const Sites: FC<Props> = ({ navigation }) => {
  const [init, setInit] = useState(false)
  const [search, setSearch] = useState('')
  const { data: sites, isLoading, isSuccess, isError, refetch } = useSites()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => setSearch(event.nativeEvent.text)
      }
    })
  }, [navigation])

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

  const renderItem: ListRenderItem<NetlifySite> = ({ item }) => {
    const navigateToSite = () => {
      navigation.navigate('Site', {
        siteID: `${item.id}`,
        name: item.custom_domain ?? `${item.default_domain}`,
        url: item.custom_domain ?? `${item.default_domain}`
      })
    }
    if (isLoading) {
      return <></>
    }

    return (
      <SiteListItem
        key={item.id}
        navigateToSite={navigateToSite}
        screenshot_url={item.screenshot_url}
        custom_domain={item.custom_domain}
        default_domain={item.default_domain}
        updated_at={item?.published_deploy?.published_at}
      />
    )
  }

  return (
    <Container>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        refreshControl={
          <RefreshControl
            refreshing={init ? isLoading : false}
            onRefresh={refetch}
          />
        }
        data={
          isLoading
            ? placeHolderItems
            : sites?.filter((site) => {
                let pattern =
                  '.*' + search.toLowerCase().split('').join('.*') + '.*'
                const re = new RegExp(pattern)
                return re.test(`${site?.name}`.toLowerCase())
              })
        }
        renderItem={renderItem}
      />
    </Container>
  )
}

const FlatList = styled.FlatList`
  padding: 16px;
`

const Container = styled.View`
  flex: 1;
`
