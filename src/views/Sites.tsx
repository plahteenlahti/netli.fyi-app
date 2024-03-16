import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useLayoutEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import Animated, { Layout } from 'react-native-reanimated'
import styled from 'styled-components/native'
import { SiteListItem } from '../components/SiteListItem'
import { useSites } from '../hooks/site'
import { SiteNavigation } from '../navigators/SitesStack'
import { NetlifySite } from '../typings/netlify'

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
  (_v, i) => i
).map((_, index) => ({
  key: `${index}`,
  id: `${index}`,
  custom_domain: 'domain',
  default_domain: 'default',
  screenshot_url: undefined,
  published_deploy: undefined
}))

export const Sites = ({
  navigation
}: NativeStackScreenProps<SiteNavigation, 'SiteList'>) => {
  const [search, setSearch] = useState<string | undefined>('')
  const sites = useSites()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch('')
      }
    })
  }, [navigation])

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
    if (sites.isLoading) {
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
        layout={Layout.springify()}
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        refreshControl={
          <RefreshControl
            refreshing={sites.isRefetching}
            onRefresh={sites.refetch}
          />
        }
        data={
          sites.isLoading && !!sites.data
            ? placeHolderItems
            : sites?.data?.filter(site => {
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
  Animated.FlatList as new () => Animated.FlatList<
    NetlifySite | PlaceholderItem
  >
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
