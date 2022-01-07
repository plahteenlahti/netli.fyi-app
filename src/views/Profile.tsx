import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { Alert, RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { AccountCard } from '../components/AccountCard'
import { Card } from '../components/Card'
import { CardTitle } from '../components/CardTitle'
import { IconRow } from '../components/IconRow'
import { useAccounts, useUser } from '../hooks/user'
import { RootStackParamList } from '../navigators/RootStack'
import { setAccessToken } from '../store/reducers/app'
import { localizedRelativeFormat } from '../utilities/time'
import { Card as LumiCard } from 'react-native-lumi'
const image = require('../assets/images/icon.png')

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList['App']['SitesStack'],
  'Profile'
>
type ProfileScreenRouteProp = RouteProp<
  RootStackParamList['App']['SitesStack'],
  'Profile'
>

type Props = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

export const Profile: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
  const { data: user, isLoading, refetch } = useUser()
  const { data: accounts } = useAccounts()

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
            navigation.navigate('Authorize')
            dispatch(setAccessToken(''))
          }
        }
      ]
    )
  }

  const lastLogin = user?.last_login
    ? localizedRelativeFormat(new Date(`${user?.last_login}`), new Date())
    : ''

  const accountCreated = user?.created_at
    ? localizedRelativeFormat(new Date(`${user?.created_at}`), new Date())
    : ''

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <Card>
          <Row>
            <Avatar resizeMode="contain" source={{ uri: user?.avatar_url }} />
            <Information>
              <Name>{user?.full_name}</Name>
              <Detail>{user?.email}</Detail>
            </Information>
          </Row>

          <Detail>Last login {lastLogin}</Detail>
          <Detail>Account created {accountCreated}</Detail>
          <Detail>Sites created {user?.site_count}</Detail>
          <BottomSection>
            <Logout onPress={logout}>
              <LogoutText>Add another account</LogoutText>
            </Logout>
            <Logout onPress={logout}>
              <LogoutText>Log out</LogoutText>
            </Logout>
          </BottomSection>
        </Card>

        <CardTitle icon="user" title="Accounts" />
        {accounts?.map((account) => {
          return <AccountCard key={account.id} account={account} />
        })}
        <LumiCard>
          <CardTitle
            icon="meteor"
            title="Extras"
            extra="Netli.fyi is a free service that helps you manage your websites. It's
          built by a single person (Perttu Lähteenlahti), and is fully open
          source. Below you can find some links to the source code and the
          documentation."
          />
        </LumiCard>
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
