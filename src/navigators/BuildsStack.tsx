import React, { FC, useContext } from 'react'
import { Platform } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { ThemeContext } from 'styled-components'
import { Deploy } from '../views/Deploy'
import { Deploys } from '../views/Deploys'
import { RootStackParamList } from './RootStack'

const Stack = createNativeStackNavigator<
  RootStackParamList['App']['BuildsStack']
>()

type ScreenOptions = any

export const BuildsStack: FC = () => {
  const { accentColor, primaryTextColor, mode } = useContext(ThemeContext)

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
        name="Deploys"
        component={Deploys}
        initialParams={{
          name: ''
        }}
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
    </Stack.Navigator>
  )
}
