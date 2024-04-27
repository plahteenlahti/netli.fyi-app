import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  View
} from 'react-native'
import { BuildSettings } from '../components/BuildSettings'
import { DeploysPreview } from '../components/DeploysPreview'
import { SiteInformation } from '../components/SiteInformation'
import { SubmissionsPreview } from '../components/SubmissionsPreview'
import { HooksPreview } from '../components/previews/hook'
import { Text } from '../components/text/Text'
import { useDeploys } from '../hooks/deploy'
import { useHooks } from '../hooks/hook'
import { useSite } from '../hooks/site'
import { useSubmissions } from '../hooks/submissions'
import { RootStackParamList } from '../navigators/RootStack'
import Animated from 'react-native-reanimated'
import { CardTitle } from '../components/CardTitle'
import { Card } from '../components/Card'
import { NoPreview } from '../components/NoPreview'
import { HStack } from '../components/layout/HStack'

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

  return (
    <View className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={site.refetch} />
        }>
        <View>
          <Card.Title className="mb-2">Preview</Card.Title>
          <Card>
            <View className="h-40 w-full p-2">
              {site.data?.screenshot_url ? (
                <Image
                  className="h-full w-full overflow-hidden rounded-sm"
                  resizeMode="cover"
                  source={{ uri: site.data?.screenshot_url }}
                />
              ) : (
                <NoPreview className="rounded-sm" />
              )}
            </View>
          </Card>

          <SiteInformation
            loading={site.isLoading}
            site={site.data}
            name={name}
          />
          <BuildSettings siteID={siteID} />

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
      </ScrollView>
    </View>
  )
}
