import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SitesStack } from './SitesStack'
import { BuildsStack } from './BuildsStack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'

const Tab = createBottomTabNavigator()

export const TabStack = () => {
  const theme = useTheme()
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
    </Tab.Navigator>
  )
}
