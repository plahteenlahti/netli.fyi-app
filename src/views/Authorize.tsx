import { AuthorizeButton } from '@components/AuthorizeButton'
import { Divider } from '@components/common/Divider'
import { TextFieldWithButton } from '@components/input/TextFieldWithButton'
import { OnboardingScroller } from '@components/onboarding/OnboardingScroller'
import { Text } from '@components/text/Text'
import { useValidateToken } from '@hooks/useValidateToken'
import { RootStackParamList } from '@navigators/RootStack'
import { RouteProp } from '@react-navigation/native'
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
import { useGetToken, useSetToken } from '@hooks/keychain'

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
  const { state, validate, reset } = useValidateToken()
  const { mutate } = useSetToken()
  const [personalAccessToken, setPersonalAccessToken] = useState('')

  const authenticateWithNetlify = async () => {
    console.log('Authenticating with Netlify')
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
      const valid = await validate(personalAccessToken)
      if (valid) {
        mutate(personalAccessToken)
        navigation.replace('App')
      }
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center w-full bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 w-full">
        <ScrollView className="" keyboardShouldPersistTaps="handled">
          <OnboardingScroller />

          <View className="px-4 gap-y-4 flex-col">
            <AuthorizeButton onPress={authenticateWithNetlify} />
            <Divider text="or authorize with" />

            {/* TODO remove this as there seems to be some kind of bug with the flex gap */}
            <View className="h-0" />

            <TextFieldWithButton
              onFocus={reset}
              state={state}
              buttonText="Authorize"
              onPress={authenticateWithToken}
              placeholder="Personal Access Token"
              onChangeText={setPersonalAccessToken}
              buttonDisabled={personalAccessToken.length < 5}
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
