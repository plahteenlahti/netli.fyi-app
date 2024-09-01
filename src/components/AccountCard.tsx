import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { usePrefetchAccount } from '@hooks/account'
import { RootStackParamList } from '@navigators/RootStack'
import { TabParamList } from '@navigators/TabStack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { Account } from '@typings/netlify.d'
import { TouchableOpacity, View } from 'react-native'
import { Card } from './Card'
import { UsageCard } from './account/UsageCard'
import { Typography } from './layout/Typography'

type Props = {
  account: Account
  navigation: CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList>,
    BottomTabScreenProps<TabParamList, 'Profile'>
  >['navigation']
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
        <View className="bg-gray-200 px-2 py-4 rounded-tl-lg rounded-tr-lg mb-4">
          <Typography>
            {account.type_name} - {account.name}
          </Typography>
        </View>
        <View className="flex-1 px-2 flex-col">
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
        </View>
      </Card>
    </TouchableOpacity>
  )
}
