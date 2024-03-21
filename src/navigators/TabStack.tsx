import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PathConfigMap } from '@react-navigation/native'

import { Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import { useUser } from '../hooks/user'
import { Profile } from '../views/Profile'
import { Sites } from '../views/Sites'
import { BuildsStack } from './BuildsStack'
import { siteNavigationLinkingConfig } from './SitesStack'
import { Builds } from '../views/Builds'

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
    <Image
      className="h-6 w-6 rounded-full"
      borderRadius={130}
      resizeMode="contain"
      source={{ uri: user.data?.avatar_url }}
    />
  )

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.secondaryTextColor
      }}>
      <Tab.Screen
        options={{
          headerLargeTitle: true,
          title: 'Netli.fyi',
          headerBlurEffect: 'light',
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
          tabBarIcon: profilePicture
        }}
      />
    </Tab.Navigator>
  )
}
