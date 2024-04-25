import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, StackActions } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import {
  Alert,
  Linking,
  RefreshControl,
  SafeAreaView,
  View
} from 'react-native'
import styled from 'styled-components/native'
import { AccountCard } from '../components/AccountCard'
import { Card } from '../components/Card'
import { CardTitle } from '../components/CardTitle'
import { IconRow } from '../components/IconRow'
import { ProfileSubscriptionPrompt } from '../components/iap/ProfileSubscriptionPrompt'
import { ButtonRow } from '../components/row/ButtonRow'
import { InfoRow } from '../components/row/InfoRow'
import { Text } from '../components/text/Text'
import { useAccounts } from '../hooks/account'
import { useUser } from '../hooks/user'
import { RootStackParamList } from '../navigators/RootStack'
import { TabParamList } from '../navigators/TabStack'
import { removeAllAccounts } from '../store/reducers/accounts'
import { useAppDispatch } from '../store/store'
import { sendEmail } from '../utilities/mail'
import { localizedRelativeFormat } from '../utilities/time'
import { useKeychain } from '../hooks/keychain'
import Config from 'react-native-config'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { Image } from 'react-native'

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList>,
  BottomTabScreenProps<TabParamList, 'Profile'>
>

export const Profile = ({ navigation }: Props) => {
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const largeTitleStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [10, -60], [1, 1.4], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP
    })

    return {
      transform: [{ scale }]
    }
  })

  const dispatch = useAppDispatch()
  const user = useUser()
  const accounts = useAccounts()

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', () => {
      navigation.navigate('DeveloperMenu')
    })

    return unsubscribe
  }, [navigation])

  const navigateToProfiles = () => {
    navigation.navigate('Profiles')
  }

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

  const lastLogin = user.data?.last_login
    ? localizedRelativeFormat(new Date(`${user.data?.last_login}`), new Date())
    : ''

  const accountCreated = user.data?.created_at
    ? localizedRelativeFormat(new Date(`${user.data?.created_at}`), new Date())
    : ''

  return (
    <SafeAreaView className="flex-1">
      <Animated.ScrollView
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            refreshing={user.isLoading}
            onRefresh={user.refetch}
          />
        }>
        <View className="h-24">
          <Animated.View
            className="origin-left absolute left-4 flex-row items-center gap-2"
            style={largeTitleStyle}>
            <Image
              className="h-8 w-8 rounded-full"
              resizeMode="contain"
              source={{ uri: user.data?.avatar_url }}
            />
            <Animated.Text className="text-3xl font-display">
              {user.data?.full_name}
            </Animated.Text>
          </Animated.View>
        </View>
        <Card>
          <Row>
            <Information>
              <Name>{user.data?.full_name}</Name>
              <Detail>{user.data?.email}</Detail>
            </Information>
          </Row>

          <InfoRow title="Last login" value={lastLogin} />
          <InfoRow title="Account created" value={accountCreated} />
          <InfoRow title="Sites created" value={user.data?.site_count} />
          <ButtonRow title="Log out" type="destructive" onPress={logout} />
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

        <CardTitle
          icon="meteor"
          title="Extras"
          extra="Netli.fyi is a free service that helps you manage your websites. It's
          built by a single person (Perttu Lähteenlahti), and is fully open
          source. Below you can find some links to the source code and the
          documentation."
        />

        <Card>
          <IconRow
            icon="twitter"
            brands
            title="Twitter"
            action={() => Linking.openURL('https://twitter.com/plahteenlahti')}
          />
          <IconRow
            icon="envelope"
            title="Contact"
            solid
            action={() =>
              sendEmail('perttu@lahteenlahti.com', 'About Netli.fyi', 'Hello!')
            }
          />
          <IconRow
            icon="heart"
            title="Rate Netli.fyi"
            solid
            action={() => {}} // TODO add rating link
          />
          <IconRow
            icon="code"
            title="Source Code"
            solid
            hideDivider
            action={() =>
              Linking.openURL('https://github.com/plahteenlahti/netli.fyi-app')
            }
          />
        </Card>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
  flex: 1;
  padding-bottom: 32px;
`

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`

const Name = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Detail = styled(Text)`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
  margin-bottom: 4px;
`

const Information = styled.View`
  margin-left: 8px;
  justify-content: center;
`
