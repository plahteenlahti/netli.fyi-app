import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useLayoutEffect, useState } from 'react'
import { ListRenderItem, RefreshControl } from 'react-native'
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated'
import { SiteListItem } from '../components/SiteListItem'
import { useSites } from '../hooks/site'
import { TabParamList } from '../navigators/TabStack'
import { NetlifySite } from '../typings/netlify'

export const Sites = ({
  navigation
}: NativeStackScreenProps<TabParamList, 'Sites'>) => {
  const sites = useSites()

  const renderItem: ListRenderItem<NetlifySite> = ({ item }) => {
    const navigateToSite = () => {
      navigation.navigate('Site', {
        siteID: `${item.id}`,
        name: item.custom_domain ?? `${item.default_domain}`,
        url: item.custom_domain ?? `${item.default_domain}`
      })
    }

    return (
      <SiteListItem
        key={item.id}
        navigateToSite={navigateToSite}
        screenshot_url={item.screenshot_url}
        custom_domain={item.custom_domain}
        default_domain={item.default_domain}
        updated_at={item?.published_deploy?.published_at}
        framework={item?.published_deploy?.framework}
      />
    )
  }

  return (
    <Animated.FlatList
      className="px-2"
      contentInsetAdjustmentBehavior="automatic"
      entering={FadeInLeft}
      exiting={FadeOutRight}
      refreshControl={
        <RefreshControl
          refreshing={sites.isRefetching}
          onRefresh={sites.refetch}
        />
      }
      data={sites.data}
      renderItem={renderItem}
    />
  )
}
