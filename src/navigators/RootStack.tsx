import { PathConfigMap, RouteProp } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { useToken } from '@hooks/useToken'

import { tabNavigatorLinkingConfig, TabParamList, TabStack } from './TabStack'
import { Linking, Pressable } from 'react-native'

import styled from 'styled-components/native'
import { Authorize } from '@views/Authorize'
import { Account } from '@views/Account'
import { Profiles } from '@views/Profiles'
import { Subscription } from '@views/Subscription'
import { Site } from '@views/SiteView'
import { Submissions } from '@views/Submissions'
import { Submission } from '@views/Submission'
import { Deploys } from '@views/Deploys'
import { Deploy } from '@views/Deploy'
import { DeveloperMenu } from '@views/DeveloperMenu'

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

export type CompositeStackParamList = RootStackParamList & TabParamList

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppLinking: PathConfigMap<RootStackParamList> = {
  App: {
    screens: tabNavigatorLinkingConfig
  }
}

export const RootStack = () => {
  const accessToken = useToken()

  const openSite = (url: string) => {
    Linking.openURL(`https://${url}`)
  }

  const headerRight = useCallback(
    (route: RouteProp<RootStackParamList, 'Site'>) => (
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
          headerShown: false,
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
