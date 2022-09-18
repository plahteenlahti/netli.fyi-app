import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { usePrefetchAccounts } from '../hooks/account'
import { useUser } from '../hooks/user'
import { SiteNavigation } from '../navigators/SitesStack'

export const ListHeader: FC = () => {
  const user = useUser()
  const prefetchAccounts = usePrefetchAccounts()

  const navigation = useNavigation<NativeStackNavigationProp<SiteNavigation>>()
  const goToProfile = () => {
    // prefetch user data so things feel instant
    prefetchAccounts()
    navigation.navigate('Profile')
  }

  return (
    <Container>
      <Avatar onPress={goToProfile}>
        <ProfilePicture
          borderRadius={130}
          resizeMode="contain"
          source={{ uri: user.data?.avatar_url }}
        />
      </Avatar>
    </Container>
  )
}

const Container = styled.View``

const Avatar = styled.TouchableOpacity``

const ProfilePicture = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 130px;
`
