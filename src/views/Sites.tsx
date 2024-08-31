import { SiteListItem } from '@components/SiteListItem'
import { AnimatedFlatList } from '@components/layout/AnimatedFlatList'
import { useSites } from '@hooks/site'
import { TabParamList } from '@navigators/TabStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NetlifySite } from '@typings/netlify'
import { formatUrl } from '@utilities/url'
import { ListRenderItem, View } from 'react-native'

export const Sites = ({
  navigation
}: NativeStackScreenProps<TabParamList, 'Sites'>) => {
  const sites = useSites()

  const renderItem: ListRenderItem<NetlifySite> = ({ item }) => {
    const navigateToSite = () => {
      navigation.navigate('Site', {
        siteID: `${item.id}`,
        name: formatUrl(item.custom_domain ?? item.default_domain),
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
    <AnimatedFlatList
      title="Sites"
      onRefresh={sites.refetch}
      refreshing={sites.isRefetching}
      data={sites.data}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  )
}

const ItemSeparatorComponent = () => {
  return <View className="h-px ml-16 bg-gray-200" />
}
