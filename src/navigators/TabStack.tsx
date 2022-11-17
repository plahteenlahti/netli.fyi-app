import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SitesStack } from './SitesStack'
import { BuildsStack } from './BuildsStack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import { Profile } from '../views/Profile'
import { useUser } from '../hooks/user'
import { usePrefetchAccounts } from '../hooks/account'
import styled from 'styled-components/native'

export type TabParamList = {
  Sites: undefined
  Builds: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

export const TabStack = () => {
  const theme = useTheme()
  const user = useUser()
  const prefetchAccounts = usePrefetchAccounts()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.secondaryTextColor
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list" color={color} size={15} />
          )
        }}
        name="Sites"
        component={SitesStack}
      />
      <Tab.Screen
        name="Builds"
        component={BuildsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hammer" color={color} size={15} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({}) => (
            <ProfilePicture
              borderRadius={130}
              resizeMode="contain"
              source={{ uri: user.data?.avatar_url }}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const ProfilePicture = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 130px;
`
