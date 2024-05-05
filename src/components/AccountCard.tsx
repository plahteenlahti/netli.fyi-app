import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Image, TouchableOpacity, View } from 'react-native'
import { usePrefetchAccount } from '@hooks/account'
import { RootStackParamList } from '../navigators/RootStack'
import { Account } from '../typings/netlify.d'
import { Card } from './Card'
import { PlaceholderIcon } from './PlaceholderIcon'
import { UsageCard } from './account/UsageCard'
import { HStack } from './layout/HStack'
import { Typography } from './layout/Typography'
import { VStack } from './layout/VStack'

type Props = {
  account: Account
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>
}

export const AccountCard = ({ account, navigation }: Props) => {
  const prefetchAccount = usePrefetchAccount()

  const navigateToAccount = () => {
    navigation.navigate('Account', { accountID: account.id })
  }

  const onPressIn = () => {
    prefetchAccount(account.id)
  }

  return (
    <TouchableOpacity onPressIn={onPressIn} onPress={navigateToAccount}>
      <Card>
        <View className="absolute bg-gray-400 p-2 rounded-tl-lg rounded-br-lg left-0 top-0">
          <Typography>{account.type_name}</Typography>
        </View>
        <HStack>
          <VStack>
            <HStack>
              {account?.team_logo_url ? (
                <Image
                  className="h-8 w-8 mr-2"
                  source={{ uri: account?.team_logo_url }}
                />
              ) : (
                <PlaceholderIcon />
              )}

              <Typography>{account.name}</Typography>
            </HStack>

            <UsageCard
              min={0}
              max={account.capabilities.bandwidth.included}
              value={account.capabilities.bandwidth.used}
              title="Bandwith used"
            />
            <UsageCard
              min={0}
              max={account.capabilities.build_minutes.included}
              value={account.capabilities.build_minutes.used}
              title="Build minutes used"
            />
            <UsageCard
              min={0}
              max={account.capabilities.sites.included}
              value={account.capabilities.sites.used}
              title="Sites"
            />
          </VStack>
        </HStack>
      </Card>
    </TouchableOpacity>
  )
}
