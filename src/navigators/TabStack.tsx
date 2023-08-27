import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PathConfigMap } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled, { useTheme } from 'styled-components/native'
import { useUser } from '../hooks/user'
import { Profile } from '../views/Profile'
import { BuildsStack } from './BuildsStack'
import { siteNavigationLinkingConfig, SitesStack } from './SitesStack'

export type TabParamList = {
  Sites: undefined
  Builds: undefined
  Profile: undefined
}
export const tabNavigatorLinkingConfig: PathConfigMap<TabParamList> = {
  Sites: {
    screens: siteNavigationLinkingConfig
  }
}

const Tab = createBottomTabNavigator<TabParamList>()

export const TabStack = () => {
  const theme = useTheme()
  const user = useUser()

  const profilePicture = () => (

    <ProfilePicture
      borderRadius={130}
      resizeMode="contain"
      source={{ uri: user.data?.avatar_url }}
    />
  )

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.secondaryTextColor,
      

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
          tabBarIcon: profilePicture
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
