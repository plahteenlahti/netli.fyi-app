import React, { FC } from 'react'
import styled from 'styled-components/native'
import { useUser } from '../hooks/user'
import { navigate } from '../navigators/RootNavigation'

export const ListHeader: FC = () => {
  const { data: user } = useUser()

  const goToProfile = () => {
    navigate('Profile', {})
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
