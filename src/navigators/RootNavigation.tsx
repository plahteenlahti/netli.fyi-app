import { NavigationContainerRef } from '@react-navigation/native'
import { createRef, RefObject } from 'react'

export const navigationRef: RefObject<NavigationContainerRef> = createRef()

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params)
}
