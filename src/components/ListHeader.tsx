import React, { FC } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'
import { getUser } from '../api/netlify'
import { navigate } from '../navigators/RootNavigation'
import { useAppSelector } from '../store/store'

export const ListHeader: FC = () => {
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )
  const { data: user } = useQuery(['profile', { accessToken }], getUser)

  const goToProfile = () => {
    navigate('Profile', {})
    // navigation.navigate('Profile')
  }

  return (
    <Container>
      <Avatar onPress={goToProfile}>
        <ProfilePicture
          borderRadius={130}
          resizeMode="contain"
          source={{ uri: user?.avatar_url }}
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
