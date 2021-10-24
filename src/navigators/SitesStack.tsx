import React, { FC, useContext } from 'react'
import { Linking, Platform, Pressable } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components/native'
import { ListHeader } from '../components/ListHeader'
import { Sites } from '../Sites'
import { RootState } from '../store/reducers'
import { Deploy } from '../views/Deploy'
import { Deploys } from '../views/Deploys'
import { Profile } from '../views/Profile'
import { Site } from '../views/Site'
import { Submission } from '../views/Submission'
import { Submissions } from '../views/Submissions'
import { RootStackParamList } from './RootStack'

const Stack = createNativeStackNavigator<
  RootStackParamList['App']['SitesStack']
>()

type ScreenOptions = any

export const SitesStack: FC = () => {
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
      screenOptions={{
        headerTintColor: accentColor,
        headerTitleStyle: {
          color: primaryTextColor
        }
      }}>
      <Stack.Screen
        options={{
          ...headerSettings,
          title: 'Netli.fyi',
          headerRight: () => <ListHeader />
        }}
        name="Sites"
        component={Sites}
      />
      <Stack.Screen
        name="Site"
        component={Site}
        options={({ route }) => ({
          title: route.params.name,
          ...headerSettings,
          headerBackTitle: 'Sites',
          stackAnimation: 'slide_from_right',
          headerRight: () => (
            <Pressable onPress={() => openSite(route.params.url)}>
              <IconBrowser size={20} name="safari" brands />
            </Pressable>
          )
        })}
      />

      <Stack.Screen
        name="Submissions"
        component={Submissions}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Submission"
        component={Submission}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />

      <Stack.Screen
        name="Deploys"
        component={Deploys}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Deploy"
        component={Deploy}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          ...headerSmallSettings
        }}
      />
    </Stack.Navigator>
  )
}

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))``
