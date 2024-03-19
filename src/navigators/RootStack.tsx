import { PathConfigMap } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useTheme } from 'styled-components/native'
import { useToken } from '../hooks/useToken'
import { Account } from '../views/Account'
import { Authorize } from '../views/Authorize'
import { DeveloperMenu } from '../views/DeveloperMenu'
import { Profiles } from '../views/Profiles'
import { Subscription } from '../views/Subscription'
import { tabNavigatorLinkingConfig, TabStack } from './TabStack'
import Config from 'react-native-config'

export type RootStackParamList = {
  Authorize: undefined
  App: undefined
  Profiles: undefined
  Account: { accountID: string }
  FeatureFlags: undefined
  Subscription: undefined
  DeveloperMenu: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppLinking: PathConfigMap<RootStackParamList> = {
  App: {
    screens: tabNavigatorLinkingConfig
  }
}

export const SiteStack = () => {
  const { accentColor, primaryTextColor } = useTheme()
  const accessToken = useToken()

  console.log(accessToken)

  console.log(Config)

  return (
    <Stack.Navigator initialRouteName={!accessToken ? 'Authorize' : 'App'}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'fullScreenModal'
        }}
        name="Authorize"
        component={Authorize}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="App"
        component={TabStack}
      />

      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profiles" component={Profiles} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen
        name="DeveloperMenu"
        options={{ presentation: 'modal' }}
        component={DeveloperMenu}
      />
    </Stack.Navigator>
  )
}
