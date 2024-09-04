import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Image, View } from 'react-native'
import { BuildSettings } from '@components/BuildSettings'
import { Card } from '@components/Card'
import { DeploysPreview } from '@components/DeploysPreview'
import { NoPreview } from '@components/NoPreview'
import { SiteInformation } from '@components/SiteInformation'
import { SubmissionsPreview } from '@components/SubmissionsPreview'
import { AnimatedScrollView } from '@components/layout/ScrollView'
import { HooksPreview } from '@components/previews/hook'
import { useActiveDeploy, useDeploys } from '@hooks/deploy'
import { useHooks } from '@hooks/hook'
import { useSite } from '@hooks/site'
import { useSubmissions } from '@hooks/submissions'
import { RootStackParamList } from '@navigators/RootStack'
import { Text } from 'react-native'
import useTimeAgo from '@hooks/time/useTimeFrom'
import { buildTimeToMinutes } from '@utilities/time'

type Props = NativeStackScreenProps<RootStackParamList, 'Site'>

export const Site = ({
  navigation,
  route: {
    params: { siteID, name }
  }
}: Props) => {
  const site = useSite(siteID)
  const deploys = useDeploys(siteID)
  const activeDeploy = useActiveDeploy(siteID)
  const submissions = useSubmissions(siteID)
  const hooks = useHooks(siteID)

  const timeFrom = useTimeAgo(
    new Date(activeDeploy.data?.created_at ?? new Date())
  )

  return (
    <View className="flex-1">
      <AnimatedScrollView
        goBack={navigation.goBack}
        title={name}
        onRefresh={site.refetch}
        refreshing={site.isRefetching}>
        <View>
          <Card.Title className="mb-2">Deploy status</Card.Title>

          <Card>
            <Text>{activeDeploy.data?.state}</Text>
            <Text>Started {timeFrom}</Text>
            {activeDeploy.data?.state === 'ready' && (
              <Text>
                Deployed in{' '}
                {buildTimeToMinutes(activeDeploy.data?.deploy_time ?? 0)}
              </Text>
            )}
          </Card>

          <Card.Title className="mb-2">Preview</Card.Title>
          <Card>
            <View className="h-48 w-full p-2">
              {site.data?.screenshot_url ? (
                <Image
                  className="h-full w-full overflow-hidden rounded-sm"
                  resizeMode="cover"
                  source={{ uri: site.data?.screenshot_url }}
                />
              ) : (
                <NoPreview className="rounded-md" />
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
      </AnimatedScrollView>
    </View>
  )
}
