import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { RefreshControl } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getAccounts, getUser } from '../api/netlify'
import { AccountCard } from '../components/AccountCard'
import { Card } from '../components/Card'
import { CardTitle } from '../components/CardTitle'
import { RootStackParamList } from '../navigators/RootStack'
import { RootState } from '../store/reducers'
import { setAccessToken } from '../store/reducers/app'
import { localizedRelativeFormat } from '../utilities/time'

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
  const accessToken = useSelector((state: RootState) => state.app.accessToken)

  const dispatch = useDispatch()
  const { data: user, isLoading, refetch } = useQuery(
    ['profile', { accessToken }],
    getUser
  )
  const { data: accounts } = useQuery(
    ['accounts', { accessToken }],
    getAccounts
  )

  const logout = () => {
    navigation.navigate('Authorize')
    dispatch(setAccessToken(''))
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

            <Logout onPress={logout}>
              <LogoutText>Log out</LogoutText>
              <LogoutIcon />
            </Logout>
          </Row>

          <Detail>Last login {lastLogin}</Detail>
          <Detail>Account created {accountCreated}</Detail>
          <Detail>Sites created {user?.site_count}</Detail>
        </Card>

        <CardTitle icon="user" title="Accounts" />
        {accounts?.map((account) => {
          return <AccountCard key={account.id} account={account} />
        })}
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

// const Title = styled.Text``

const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 60px;
`

const Information = styled.View`
  margin-left: 8px;
  justify-content: center;
`

// const AuthenticateButton = styled.TouchableOpacity``

// const AuthenticateButtonText = styled.Text`
//   color: ${({ theme }) => theme.primaryTextColor};
// `

const Logout = styled.TouchableOpacity`
  position: absolute;
  flex-direction: row;
  align-items: center;
  top: 0;
  right: 0;
`

const LogoutIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'sign-out-alt',
  size: 15,
  color: theme.secondaryTextColor
}))``

const LogoutText = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  margin-right: 8px;
`
