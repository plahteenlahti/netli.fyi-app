import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useTheme } from 'styled-components/native'
import { useToken } from '../hooks/useToken'
import { Authorize } from '../views/Authorize'
import { TabStack } from './TabStack'

export type RootStackParamList = {
  Authorize: undefined
  App: {
    Sites: undefined
    Builds: {
      Builds: { siteID: string; name: string }
      Build: { name: string; buildID: string }
    }
  }
}

export type SiteNavigation = {
  SiteList: undefined
  Site: { name: string; url: string; siteID: string }
  Hook: { name: string; hookID: string }
  Deploys: { siteID: string; name: string }
  Deploy: { name: string; buildID: string }
  Submissions: { siteID: string; name: string }
  Submission: { submissionID: string; name: string }
  Profile: undefined
  Profiles: undefined
  Account: { accountID: string }
  FeatureFlags: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

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
    </Stack.Navigator>
  )
}
