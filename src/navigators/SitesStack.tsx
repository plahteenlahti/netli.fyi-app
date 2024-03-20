import { PathConfigMap, RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC, useCallback, useMemo } from 'react'
import { Linking, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Sites } from '../views/Sites'
import { Deploy } from '../views/Deploy'
import { Deploys } from '../views/Deploys'
import { Site } from '../views/Site'
import { Submission } from '../views/Submission'
import { Submissions } from '../views/Submissions'

export type SiteNavigation = {
  SiteList: undefined
  Site: { name: string; url: string; siteID: string }
  Hook: { name: string; hookID: string }
  Deploys: { siteID: string; name: string }
  Deploy: { name: string; buildID: string }
  Submissions: { siteID: string; name: string }
  Submission: { submissionID: string; name: string }
}

export const siteNavigationLinkingConfig: PathConfigMap<SiteNavigation> = {
  SiteList: {
    path: '/sites'
  }
}

const Stack = createNativeStackNavigator<SiteNavigation>()

const openSite = (url: string) => {
  Linking.openURL(`https://${url}`)
}

export const SitesStack: FC = () => {
  const headerRight = useCallback(
    (route: RouteProp<SiteNavigation, 'Site'>) => (
      <Pressable onPress={() => openSite(route.params.url)}>
        <IconBrowser size={20} name="safari" brand />
      </Pressable>
    ),
    []
  )

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLargeTitle: true,
          title: 'Netli.fyi',
          headerBlurEffect: 'light',
          headerStyle: {
            backgroundColor: 'transparent'
          }
        }}
        name="SiteList"
        component={Sites}
      />
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
    </Stack.Navigator>
  )
}

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))``
