import { AccountCard } from '@components/AccountCard'
import { Card } from '@components/Card'
import { CardTitle } from '@components/CardTitle'
import { ProfileSubscriptionPrompt } from '@components/iap/ProfileSubscriptionPrompt'
import { AnimatedScrollView } from '@components/layout/ScrollView'
import { ButtonRow } from '@components/row/ButtonRow'
import { InfoRow } from '@components/row/InfoRow'
import { useAccounts } from '@hooks/account'
import useTimeAgo from '@hooks/time/useTimeFrom'
import { useUser } from '@hooks/user'
import { RootStackParamList } from '@navigators/RootStack'
import { TabParamList } from '@navigators/TabStack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, StackActions } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Alert, Image, Text } from 'react-native'
import { removeAllAccounts } from '../store/reducers/accounts'
import { useAppDispatch } from '../store/store'
import { localizedRelativeFormat } from '../utilities/time'

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>

export const Profile = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const user = useUser()
  const accounts = useAccounts()

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', () => {
      navigation.navigate('DeveloperMenu')
    })

    return unsubscribe
  }, [navigation])

  const logout = () => {
    Alert.alert(
      'Logging out?',
      'Are you sure you want to log out of Netli.fyi?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.dispatch(StackActions.replace('Authorize'))
            dispatch(removeAllAccounts())
          }
        }
      ]
    )
  }

  const lastLogin = useTimeAgo(new Date(user.data?.last_login ?? new Date()))

  const accountCreated = user.data?.created_at
    ? localizedRelativeFormat(new Date(`${user.data?.created_at}`), new Date())
    : ''

  return (
    <AnimatedScrollView
      extraElement={
        <Image
          className="h-8 w-8 rounded-full bg-gray-500"
          resizeMode="contain"
          source={{ uri: user.data?.avatar_url }}
        />
      }
      onRefresh={user.refetch}
      refreshing={user.isRefetching}
      title="Profile">
      <Text />
      <Card>
        <InfoRow title="Last login" value={lastLogin} />
        <InfoRow title="Account created" value={accountCreated} />
        <InfoRow title="Sites created" value={user.data?.site_count} />
        <ButtonRow
          hideDivider
          title="Log out"
          type="destructive"
          onPress={logout}
        />
      </Card>

      <ProfileSubscriptionPrompt />

      <CardTitle icon="user" title="Accounts" />
      {accounts.data?.map(account => {
        return (
          <AccountCard
            navigation={navigation}
            key={account.id}
            account={account}
          />
        )
      })}
    </AnimatedScrollView>
  )
}
