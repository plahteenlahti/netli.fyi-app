import { PathConfigMap, RouteProp } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { useToken } from '../hooks/useToken'
import { Account } from '../views/Account'
import { Authorize } from '../views/Authorize'
import { DeveloperMenu } from '../views/DeveloperMenu'
import { Profiles } from '../views/Profiles'
import { Subscription } from '../views/Subscription'
import { tabNavigatorLinkingConfig, TabStack } from './TabStack'
import { SiteNavigation } from './SitesStack'
import { Linking, Pressable } from 'react-native'
import { Deploy } from '../views/Deploy'
import { Deploys } from '../views/Deploys'
import { Submission } from '../views/Submission'
import { Submissions } from '../views/Submissions'
import { Site } from '../views/Site'
import styled from 'styled-components/native'

export type RootStackParamList = {
  Authorize: undefined
  App: undefined
  Profiles: undefined
  Account: { accountID: string }
  FeatureFlags: undefined
  Subscription: undefined
  DeveloperMenu: undefined

  Site: { name: string; url: string; siteID: string }
  Hook: { name: string; hookID: string }
  Deploys: { siteID: string; name: string }
  Deploy: { name: string; buildID: string }
  Submissions: { siteID: string; name: string }
  Submission: { submissionID: string; name: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppLinking: PathConfigMap<RootStackParamList> = {
  App: {
    screens: tabNavigatorLinkingConfig
  }
}

export const SiteStack = () => {
  const accessToken = useToken()

  const openSite = (url: string) => {
    Linking.openURL(`https://${url}`)
  }

  const headerRight = useCallback(
    (route: RouteProp<SiteNavigation, 'Site'>) => (
      <Pressable onPress={() => openSite(route.params.url)}>
        <IconBrowser size={20} name="safari" brand />
      </Pressable>
    ),
    []
  )

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
        name="Site"
        component={Site}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: 'Sites',
          stackAnimation: 'slide_from_right',
          headerRight: () => headerRight(route)
        })}
      />
      <Stack.Screen
        name="Submissions"
        component={Submissions}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Submission"
        component={Submission}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',

          title: route.params.name
        })}
      />

      <Stack.Screen
        name="Deploys"
        component={Deploys}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Deploy"
        component={Deploy}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          title: route.params.name
        })}
      />

      <Stack.Screen
        name="DeveloperMenu"
        options={{ presentation: 'modal' }}
        component={DeveloperMenu}
      />
    </Stack.Navigator>
  )
}

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))``
