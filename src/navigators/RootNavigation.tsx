import { NavigationContainerRef } from '@react-navigation/native'
import { createRef, RefObject } from 'react'
import { SiteNavigation } from './SitesStack'

export const navigationRef: RefObject<NavigationContainerRef<SiteNavigation>> =
  createRef()

export function navigate(name: keyof SiteNavigation, params: any) {
  navigationRef.current?.navigate(name, params)
}
