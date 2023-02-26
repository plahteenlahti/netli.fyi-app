import { PathConfigMap } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useTheme } from 'styled-components/native'
import { useToken } from '../hooks/useToken'
import { Account } from '../views/Account'
import { Authorize } from '../views/Authorize'
import { FeatureFlags } from '../views/FeatureFlags'
import { Profiles } from '../views/Profiles'
import { Subscription } from '../views/Subscription'
import { tabNavigatorLinkingConfig, TabStack } from './TabStack'

export type RootStackParamList = {
  Authorize: undefined
  App: undefined
  Profile: undefined
  Profiles: undefined
  Account: { accountID: string }
  FeatureFlags: undefined
  Subscription: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppLinking: PathConfigMap<RootStackParamList> = {
  App: {
    screens: tabNavigatorLinkingConfig
  }
}

export const SiteStack: FC = () => {
  const { accentColor, primaryTextColor } = useTheme()
  const accessToken = useToken()

  return (
    <Stack.Navigator
      initialRouteName={!accessToken ? 'Authorize' : 'App'}
      screenOptions={{
        headerTintColor: accentColor,
        headerTitleStyle: {
          color: primaryTextColor
        }
      }}>
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
      <Stack.Screen name="FeatureFlags" component={FeatureFlags} />
      <Stack.Screen name="Profiles" component={Profiles} />
      <Stack.Screen name="Subscription" component={Subscription} />
    </Stack.Navigator>
  )
}
