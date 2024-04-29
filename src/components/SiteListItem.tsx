import { Image, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { localizedRelativeFormat } from '../utilities/time'
import { NoPreview } from './NoPreview'
import { Typography } from './layout/Typography'

type Props = {
  navigateToSite: () => void
  screenshot_url?: string
  updated_at?: string
  custom_domain?: string
  default_domain?: string
  framework?: string
}

export const SiteListItem = ({
  navigateToSite,
  screenshot_url,
  updated_at,
  custom_domain,
  default_domain,
  framework
}: Props) => {
  const lastDeploy = localizedRelativeFormat(
    new Date(`${updated_at}`),
    new Date()
  )

  return (
    <TouchableOpacity onPress={navigateToSite}>
      <View className="p-2 bg-white flex-row items-center">
        <View className="h-10 w-14 overflow-hidden rounded-sm">
          {screenshot_url ? (
            <Image
              className="h-full w-full overflow-hidden"
              resizeMode="cover"
              source={{ uri: screenshot_url }}
            />
          ) : (
            <NoPreview />
          )}
        </View>

        <View className="border-b border-gray-200 flex-row flex-1 pb-2 items-center gap-4">
          <View className="pl-2 flex-1">
            <Typography
              numberOfLines={1}
              lineBreakMode="clip"
              className="text-base text-gray-700 font-semibold flex-1">
              {custom_domain || default_domain}
            </Typography>
            <Typography className="text-sm text-gray-500">
              {`Last deploy ${lastDeploy}`}- {framework}
            </Typography>
          </View>
          <Chevron name="chevron-right" size={15} solid />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``
