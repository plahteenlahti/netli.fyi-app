import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useTheme } from 'styled-components/native'
import { useAppSelector } from '../store/store'
import { Authorize } from '../views/Authorize'
import { TabStack } from './TabStack'

export type RootStackParamList = {
  Authorize: undefined
  App: {
    Sites: {
      SiteList: undefined
      Site: { name: string; url: string; siteID: string }
      Deploys: { siteID: string; name: string }
      Deploy: { name: string; buildID: string }
      Submissions: { siteID: string; name: string }
      Submission: { submissionID: string; name: string }
      Profile: undefined
    }
    Builds: {
      Builds: { siteID: string; name: string }
      Build: { name: string; buildID: string }
    }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const SiteStack: FC = () => {
  const { accentColor, primaryTextColor } = useTheme()
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

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
          stackPresentation: 'fullScreenModal'
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
