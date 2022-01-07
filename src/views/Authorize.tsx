import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useState } from 'react'
import { Dimensions, Linking } from 'react-native'
import { authorize } from 'react-native-app-auth'
import { ClipPath, Defs, Image, Svg, Text, TSpan } from 'react-native-svg'
import configuration from 'react-native-ultimate-config'
import styled from 'styled-components/native'
import { AuthorizeButton } from '../components/AuthorizeButton'
import { RootStackParamList } from '../navigators/RootStack'
import { addAccountFirstTime } from '../store/reducers/accounts'
import { useAppDispatch } from '../store/store'

const { width } = Dimensions.get('window')

type AuthorizationScreenNavigationProp = StackNavigationProp<
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
      navigation.replace('App', {})
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
      navigation.replace('App', {})
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Container>
      <ScrollView>
        <Card>
          <IconContainer>
            <Icon resizeMode="cover" source={image} />
          </IconContainer>
          <Svg
            height="50"
            width="145"
            style={{
              transform: [{ scale: 1.3 }]
            }}>
            <Defs>
              <ClipPath id="clip">
                <Text
                  fill="red"
                  stroke="blue"
                  fontFamily="Avenir Next"
                  x="10"
                  y="30"
                  fontSize="35"
                  fontWeight="600"
                  scale="1">
                  <TSpan>Netli.fyi</TSpan>
                </Text>
              </ClipPath>
            </Defs>

            <Image
              x="5%"
              y="5%"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              href={gradient}
              clipPath="url(#clip)"
            />
          </Svg>
          <Summary>
            Netli.fyi helps you to manage your Netlify hosted sites on the go.
            See your sites' settings, manage form submissions, and quickly see
            your deployments.
          </Summary>
        </Card>
        <ButtonContainer>
          <AuthorizeButton onPress={authenticateWithNetlify} />
        </ButtonContainer>

        <DividerContainer>
          <Divider />
          <DividerText>Or authorize with</DividerText>
        </DividerContainer>

        <ORSection>
          <InputContainer>
            <Input
              onChangeText={(text) => setPersonalAccessToken(text)}
              placeholder="Personal access token"
            />
            <AuthorizeButtonSmall onPress={authenticateWithToken}>
              <ButtonText>Authorize</ButtonText>
            </AuthorizeButtonSmall>
          </InputContainer>
          <HelpText>
            You can create a personal access token{' '}
            <HelpTextLink
              onPress={() =>
                Linking.openURL(
                  'https://app.netlify.com/user/applications#personal-access-tokens'
                )
              }>
              here.
            </HelpTextLink>
          </HelpText>
        </ORSection>
      </ScrollView>
    </Container>
  )
}

const DividerContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 32px;
`

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.borderColor};
  width: 100%;
  margin: 16px;
  position: absolute;
`

const DividerText = styled.Text`
  background-color: ${({ theme }) => theme.primaryBackground};
  color: ${({ theme }) => theme.secondaryTextColor};
  padding: 0px 20px;
`

const ORSection = styled.View`
  width: 100%;
  padding: 0px 16px;
`

const AuthorizeButtonSmall = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  background-color: ${({ theme }) => theme.accentColor};
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`

const ButtonText = styled.Text`
  color: white;
`

const Input = styled.TextInput`
  padding: 16px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 8px;
`

const HelpText = styled.Text`
  margin-top: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
  text-align: center;
`

const InputContainer = styled.View``

const HelpTextLink = styled.Text`
  color: ${({ theme }) => theme.accentColor};
`

const Card = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  margin: 16px;
  padding: 16px;
  align-items: center;
  elevation: 3;
  max-width: 600px;
`

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center'
  }
}))`
  background-color: ${({ theme }) => theme.primaryBackground};
`

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  width: ${width}px;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const Summary = styled.Text`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.primaryTextColor};
  margin-bottom: 16px;
  line-height: 24px;
`

const IconContainer = styled.View`
  margin-top: 50px;
  height: 64px;
  width: 64px;
  overflow: hidden;
  border-radius: 18px;
  margin-bottom: 30px;
`

const Icon = styled.Image`
  height: 100%;
  width: 100%;
`

const ButtonContainer = styled.View`
  margin: 32px 0px;
  padding: 0px 16px;
  flex-direction: row;
  max-width: 400px;
`
