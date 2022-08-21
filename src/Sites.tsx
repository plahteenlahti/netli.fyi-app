import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { SiteListItem } from './components/SiteListItem'
// import { SiteListItemSkeleton } from './components/SiteListItemSkeleton'
import { useSites } from './hooks/site'
import { SiteNavigation } from './navigators/SitesStack'
import { NetlifySite } from './typings/netlify.d'

type Navigation = NativeStackNavigationProp<SiteNavigation, 'SiteList'>
type SitesScreenRouteProp = RouteProp<SiteNavigation, 'SiteList'>

type Props = {
  navigation: Navigation
  route: SitesScreenRouteProp
}

type PlaceholderItem = {
  key: string
  id: string
  custom_domain: 'domain'
  default_domain: 'default'
  screenshot_url: undefined
  published_deploy: undefined
}

const placeHolderItems: Array<PlaceholderItem> = Array.from(
  { length: 10 },
  (v, i) => i
).map((_, index) => ({
  key: `${index}`,
  id: `${index}`,
  custom_domain: 'domain',
  default_domain: 'default',
  screenshot_url: undefined,
  published_deploy: undefined
}))

export const Sites: FC<Props> = ({ navigation }) => {
  const [init, setInit] = useState(false)
  const [search, setSearch] = useState<string | undefined>('')
  const { data: sites, isLoading, isSuccess, isError, refetch } = useSites()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch('')
      }
    })
  }, [navigation])

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

  const renderItem: ListRenderItem<NetlifySite | PlaceholderItem> = ({
    item
  }) => {
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
      <List
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
            : sites?.filter(site => {
                let pattern =
                  '.*' + search?.toLowerCase().split('').join('.*') + '.*'
                const re = new RegExp(pattern)
                return re.test(`${site?.name}`.toLowerCase())
              })
        }
        renderItem={renderItem}
      />
    </Container>
  )
}

const List = styled(
  FlatList as new () => FlatList<NetlifySite | PlaceholderItem>
).attrs(() => ({
  contentContainerStyle: {
    borderRadius: 8,
    overflow: 'hidden'
  }
}))`
  padding: 16px;
  border-radius: 8px;
`

const Container = styled.View`
  flex: 1;
`
