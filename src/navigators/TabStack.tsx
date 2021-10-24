import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SitesStack } from './SitesStack'
import { BuildsStack } from './BuildsStack'

const Tab = createBottomTabNavigator()

export const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sites" component={SitesStack} />
      <Tab.Screen name="Builds" component={BuildsStack} />
    </Tab.Navigator>
  )
}
