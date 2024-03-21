import { PathConfigMap } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Linking } from 'react-native'
import { Sites } from '../views/Sites'

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
  return <Stack.Navigator></Stack.Navigator>
}
