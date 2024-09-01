import { AuthorizeButton } from '@components/AuthorizeButton'
import { Divider } from '@components/common/Divider'
import { TextFieldWithButton } from '@components/input/TextFieldWithButton'
import { OnboardingScroller } from '@components/onboarding/OnboardingScroller'
import { Text } from '@components/text/Text'
import { RootStackParamList } from '@navigators/RootStack'
import { RouteProp, StackActions } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { openURL } from '@utilities/url'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import { AuthConfiguration, authorize } from 'react-native-app-auth'
import Config from 'react-native-config'
import { addAccountFirstTime } from '../store/reducers/accounts'
import { useAppDispatch } from '../store/store'

type AuthorizationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authorize'
>
type AuthorizationScreenRouteProp = RouteProp<RootStackParamList, 'Authorize'>

type Props = {
  navigation: AuthorizationScreenNavigationProp
  route: AuthorizationScreenRouteProp
}

const config: AuthConfiguration = {
  issuer: 'https://app.netlify.com',
  clientId: Config.client_id ?? '',
  clientSecret: Config.client_secret,
  redirectUrl: Config.redirect_url ?? 'com.netlify.app://oauth',
  usePKCE: false,
  scopes: [],
  serviceConfiguration: {
    authorizationEndpoint: 'https://app.netlify.com/authorize',
    tokenEndpoint: 'https://api.netlify.com/oauth/token'
  }
}

export const Authorize = ({ navigation }: Props) => {
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
      navigation.replace('App')
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

  const onChangeText = (token: string) => {
    setPersonalAccessToken(token)
  }

  return (
    <SafeAreaView className="flex-1 items-center w-full bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 w-full">
        <ScrollView className="">
          <OnboardingScroller />

          <View className="px-4 gap-y-4 flex-col">
            <AuthorizeButton onPress={authenticateWithNetlify} />
            <Divider text="or authorize with" />
            <TextFieldWithButton
              buttonText="Authorize"
              onPress={authenticateWithToken}
              placeholder="Personal Access Token"
              onChangeText={onChangeText}
              buttonDisabled={personalAccessToken.length > 5}
              maxLength={100}
            />

            <Text className="text-sm text-gray-500 text-center">
              You can create a personal access token{' '}
              <Text
                className="text-blue-500"
                onPress={() =>
                  openURL(
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
