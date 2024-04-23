import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import { BuildSettings } from '../components/BuildSettings'
import { DeploysPreview } from '../components/DeploysPreview'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { ScrollViewWithHero } from '../components/common/ScrollViewWithHero'
import { HooksPreview } from '../components/previews/hook'
import { Text } from '../components/text/Text'
import { useDeploys } from '../hooks/deploy'
import { useHooks } from '../hooks/hook'
import { useSite } from '../hooks/site'
import { useSubmissions } from '../hooks/submissions'
import { RootStackParamList } from '../navigators/RootStack'

type Props = NativeStackScreenProps<RootStackParamList, 'Site'>

export const Site = ({
  route: {
    params: { siteID, name }
  }
}: Props) => {
  const site = useSite(siteID)
  const deploys = useDeploys(siteID)
  const submissions = useSubmissions(siteID)
  const hooks = useHooks(siteID)

  const sections = [
    'site information',
    'build settings',
    'deploys',
    'web hooks'
  ]

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <View key={item}>
      <Text type="subtitle"> {item}</Text>
    </View>
  )

  return (
    <View className="flex-1">
      <ScrollViewWithHero
        source={{ uri: site.data?.screenshot_url }}
        refreshControl={
          <RefreshControl
            refreshing={site.isRefetching}
            onRefresh={site.refetch}
          />
        }>
        <View>
          <FlatList
            data={sections}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderItem}
          />

          <SiteInformation site={site.data} name={name} />
          <BuildSettings site={site.data} />

          {deploys.data && deploys.data.length > 0 && (
            <DeploysPreview
              siteID={siteID}
              siteName={name}
              deploys={deploys.data}
            />
          )}

          {hooks.data && hooks.data.length > 0 && (
            <HooksPreview siteID={siteID} siteName={name} hooks={hooks.data} />
          )}

          {submissions.data && submissions.data.length > 0 && (
            <SubmissionsPreview
              siteID={siteID}
              siteName={name}
              submissions={submissions.data}
            />
          )}
        </View>
      </ScrollViewWithHero>
    </View>
  )
}
