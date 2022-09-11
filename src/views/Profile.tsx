import { RouteProp, StackActions } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Alert, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { AccountCard } from '../components/AccountCard'
import { Card } from '../components/Card'
import { CardTitle } from '../components/CardTitle'
import { IconRow } from '../components/IconRow'
import { ButtonRow } from '../components/row/ButtonRow'
import { InfoRow } from '../components/row/InfoRow'
import { NavigationRow } from '../components/row/NavigationRow'
import { ToggleRow } from '../components/row/ToggleRow'
import { useRemoteValue } from '../config/remote-config'
import { useAccounts } from '../hooks/account'
import { useUser } from '../hooks/user'
import { SiteNavigation } from '../navigators/SitesStack'
import { removeAllAccounts } from '../store/reducers/accounts'
import { toggleAnalytics } from '../store/reducers/app'
import { useAppDispatch, useAppSelector } from '../store/store'
import { localizedRelativeFormat } from '../utilities/time'
const image = require('../assets/images/icon.png')

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Profile'>
type Route = RouteProp<SiteNavigation, 'Profile'>

type Props = {
  navigation: Navigation
  route: Route
}

export const Profile: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const user = useUser()
  const accounts = useAccounts()
  const analyticsEnabled = useAppSelector(({ app }) => app.analyticsEnabled)

  const _toggleAnalytics = () => {
    dispatch(toggleAnalytics(!analyticsEnabled))
  }

  const value = useRemoteValue('iap_enabled')
  console.log(analyticsEnabled)

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
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={user.isLoading}
            onRefresh={user.refetch}
          />
        }>
        <Card>
          <Row>
            <Avatar
              resizeMode="contain"
              source={{ uri: user.data?.avatar_url }}
            />
            <Information>
              <Name>{user.data?.full_name}</Name>
              <Detail>{user.data?.email}</Detail>
            </Information>
          </Row>

          <InfoRow title="Last login" value={lastLogin} />
          <InfoRow title="Account created" value={accountCreated} />
          <InfoRow title="Sites created" value={user.data?.site_count} />
          <InfoRow title="Feature flags" value={5} />
          <ToggleRow
            value={analyticsEnabled}
            onChange={_toggleAnalytics}
            title="Analytics"
            subtitle="I want to help improve the app by sharing my usage statistics."
          />
          <NavigationRow title="Add another account" />
          <ButtonRow hideDivider title="Log out" type="destructive" />
        </Card>

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
        <Card>
          <CardTitle
            icon="meteor"
            title="Extras"
            extra="Netli.fyi is a free service that helps you manage your websites. It's
          built by a single person (Perttu Lähteenlahti), and is fully open
          source. Below you can find some links to the source code and the
          documentation."
          />
        </Card>
        <Card>
          <IconContainer>
            <Icon resizeMode="cover" source={image} />
          </IconContainer>
          <Row>
            <Title>Support Netli.fyi</Title>
            <Description />
          </Row>
        </Card>
        <Card>
          <IconRow icon="twitter" brands title="Twitter" action={() => {}} />
          <IconRow icon="envelope" title="Contact" solid action={() => {}} />
          <IconRow
            icon="heart"
            title="Rate Netli.fyi"
            solid
            action={() => {}}
          />
          <IconRow
            icon="code"
            title="Source Code"
            solid
            last
            action={() => {}}
          />
        </Card>
      </ScrollView>
    </Container>
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

const Name = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Detail = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
  margin-bottom: 4px;
`

const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 60px;
`

const Information = styled.View`
  margin-left: 8px;
  justify-content: center;
`

const Logout = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0px 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.borderColor};
`

const LogoutText = styled.Text`
  color: ${({ theme }) => theme.accentColor};
  font-size: 15px;
  margin-right: 8px;
`

const BottomSection = styled.View`
  margin-top: 16px;
`

const IconContainer = styled.View`
  margin-top: 50px;
  height: 64px;
  width: 64px;
  overflow: hidden;
  border-radius: 18px;
  margin-bottom: 30px;
`

const Icon = styled.Image`
  height: 100%;
  width: 100%;
`

const Title = styled.Text``

const Description = styled.Text``
