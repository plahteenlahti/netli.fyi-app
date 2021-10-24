import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import { authorize } from 'react-native-app-auth'
import { ClipPath, Defs, Image, Svg, Text, TSpan } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { AuthorizeButton } from '../components/AuthorizeButton'
import { RootStackParamList } from '../navigators/RootStack'
import { setAccessToken } from '../store/reducers/app'
import configuration from 'react-native-ultimate-config'

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

export const Authorize: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
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

  const authenticateWithNetlify = async () => {
    try {
      const { accessToken: newAccessToken } = await authorize(config)
      dispatch(setAccessToken(newAccessToken))
      navigation.replace('App')
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
      </ScrollView>
    </Container>
  )
}

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
