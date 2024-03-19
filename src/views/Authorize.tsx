import { RouteProp, StackActions } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { authorize } from 'react-native-app-auth'
import configuration from 'react-native-ultimate-config'
import styled from 'styled-components/native'
import { AuthorizeButton } from '../components/AuthorizeButton'
import { OnboardingScroller } from '../components/onboarding/OnboardingScroller'
import { Text } from '../components/text/Text'
import { RootStackParamList } from '../navigators/RootStack'
import { addAccountFirstTime } from '../store/reducers/accounts'
import { useAppDispatch } from '../store/store'

const { width } = Dimensions.get('window')

type AuthorizationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authorize'
>
type AuthorizationScreenRouteProp = RouteProp<RootStackParamList, 'Authorize'>

type Props = {
  navigation: AuthorizationScreenNavigationProp
  route: AuthorizationScreenRouteProp
}

const image = require('../assets/images/icon.png')
const gradient = require('../assets/images/gradient.png')

const config = {
  clientId: configuration.client_id,
  clientSecret: configuration.client_secret,
  redirectUrl: configuration.redirect_url,
  usePKCE: false,
  scopes: [],
  serviceConfiguration: {
    authorizationEndpoint: 'https://app.netlify.com/authorize',
    tokenEndpoint: 'https://api.netlify.com/oauth/token'
  }
}

export const Authorize: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [personalAccessToken, setPersonalAccessToken] = useState('')

  const authenticateWithNetlify = async () => {
    try {
      const { accessToken: newAccessToken } = await authorize(config)
      dispatch(
        addAccountFirstTime({
          name: 'New Netlify Token',
          createdAt: new Date().toISOString(),
          accessToken: newAccessToken
        })
      )
      navigation.dispatch(StackActions.replace('App'))
    } catch (error) {
      console.warn(error)
    }
  }

  const authenticateWithToken = async () => {
    try {
      dispatch(
        addAccountFirstTime({
          name: 'New Personal Access Token',
          createdAt: new Date().toISOString(),
          accessToken: personalAccessToken
        })
      )
      navigation.dispatch(StackActions.replace('App'))
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center w-full bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 w-full">
        <ScrollView
          contentContainerclassName="items-center bg-white"
          className="w-full">
          <OnboardingScroller />

          <View className="my-8 px-4 flex-row max-w-xs w-full">
            <AuthorizeButton onPress={authenticateWithNetlify} />
          </View>

          <View className="justify-center items-center flex-1 w-full px-5 mb-8">
            <View className="absolute h-px bg-gray-200 w-full my-4" />
            <Text className="bg-white text-gray-500 px-5">
              Or authorize with
            </Text>
          </View>

          <View className="w-full px-4">
            <View className="">
              <TextInput
                className="px-4 bg-gray-200 rounded-lg py-4"
                onChangeText={text => setPersonalAccessToken(text)}
                placeholder="Personal access token"
              />
              <TouchableOpacity
                className="absolute right-0 bg-blue-500 justify-center items-center px-2 py-1 m-2 rounded-lg"
                onPress={authenticateWithToken}>
                <Text className="text-white">Authorize</Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-4 text-sm text-gray-500 text-center">
              You can create a personal access token{' '}
              <Text
                className="text-blue-500"
                onPress={() =>
                  Linking.openURL(
                    'https://app.netlify.com/user/applications#personal-access-tokens'
                  )
                }>
                here.
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
