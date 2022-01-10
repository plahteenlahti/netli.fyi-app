import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Builds } from '../views/Builds'
import { Deploy } from '../views/Deploy'
import { RootStackParamList } from './RootStack'

const Stack = createNativeStackNavigator<RootStackParamList['App']['Builds']>()

type ScreenOptions = any

export const BuildsStack: FC = () => {
  const { accentColor, primaryTextColor, mode } = useTheme()

  const headerSmallSettings = (
    Platform.OS === 'ios'
      ? {
          headerTranslucent: true,
          headerTopInsetEnabled: true,
          headerStyle: {
            backgroundColor: 'transparent',
            blurEffect: mode
          }
        }
      : {}
  ) as ScreenOptions

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: accentColor,
        headerTitleStyle: {
          color: primaryTextColor
        }
      }}>
      <Stack.Screen
        name="Builds"
        component={Builds}
        initialParams={{
          name: ''
        }}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          headerShown: false,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Build"
        component={Deploy}
        options={({ route }) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
    </Stack.Navigator>
  )
}
