import { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PathConfigMap } from '@react-navigation/native'

import { Image, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import { useUser } from '../hooks/user'
import { Profile } from '../views/Profile'
import { Sites } from '../views/Sites'

import { Builds } from '../views/Builds'
import { BlurView } from '@react-native-community/blur'

export type TabParamList = {
  Sites: undefined
  Builds: undefined
  Profile: undefined
}
export const tabNavigatorLinkingConfig: PathConfigMap<TabParamList> = {
  Sites: {
    screens: undefined
  }
}

const Tab = createBottomTabNavigator<TabParamList>()

export const TabStack = () => {
  const theme = useTheme()
  const user = useUser()

  const profilePicture = useCallback(
    () => (
      <Image
        className="h-6 w-6 rounded-full"
        borderRadius={130}
        resizeMode="contain"
        source={{ uri: user.data?.avatar_url }}
      />
    ),
    [user.data?.avatar_url]
  )

  const tabBarBackground = useCallback(
    () => (
      <BlurView
        blurAmount={1}
        blurType="prominent"
        style={{
          ...StyleSheet.absoluteFillObject
        }}
      />
    ),
    []
  )

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.secondaryTextColor,
        tabBarStyle: {
          borderTopColor: 'transparent'
        },
        tabBarBackground: tabBarBackground
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Netli.fyi',
          headerStyle: {
            backgroundColor: 'transparent'
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list" color={color} size={15} />
          )
        }}
        name="Sites"
        component={Sites}
      />
      <Tab.Screen
        name="Builds"
        component={Builds}
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
          headerShown: false,
          tabBarIcon: profilePicture
        }}
      />
    </Tab.Navigator>
  )
}
