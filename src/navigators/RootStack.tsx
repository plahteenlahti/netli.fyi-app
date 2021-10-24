import React, { FC, useContext } from 'react'
import { Linking, Platform } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import styled, { ThemeContext } from 'styled-components/native'
import { RootState } from '../store/reducers'
import { Authorize } from '../views/Authorize'
import { TabStack } from './TabStack'

export type RootStackParamList = {
  Authorize: undefined
  App: {
    SitesStack: {
      Sites: undefined
      Site: { name: string; url: string; siteID: string }
      Deploys: { siteID: string; name: string }
      Deploy: { name: string; buildID: string }
      Submissions: { siteID: string; name: string }
      Submission: { submissionID: string; name: string }
      Profile: undefined
    }
    BuildsStack: {
      Deploys: { siteID: string; name: string }
      Deploy: { name: string; buildID: string }
    }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type ScreenOptions = any

export const SiteStack: FC = () => {
  const { accentColor, primaryTextColor, mode } = useContext(ThemeContext)
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const openSite = (url: string) => {
    Linking.openURL(`https://${url}`)
  }

  const headerSettings = (Platform.OS === 'ios'
    ? {
        headerTranslucent: true,
        headerLargeTitle: true,
        headerTopInsetEnabled: true,
        headerStyle: {
          backgroundColor: 'transparent',
          blurEffect: mode
        }
      }
    : {}) as ScreenOptions

  const headerSmallSettings = (Platform.OS === 'ios'
    ? {
        headerTranslucent: true,
        headerTopInsetEnabled: true,
        headerStyle: {
          backgroundColor: 'transparent',
          blurEffect: mode
        }
      }
    : {}) as ScreenOptions

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

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))``
