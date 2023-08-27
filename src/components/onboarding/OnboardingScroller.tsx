import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import {
  ClipPath,
  Defs,
  Image,
  Svg,
  Text as SvgText,
  TSpan
} from 'react-native-svg'

// Onboarding view in authorization screen
// in React Native 
// styled with tailwindcss
const { width } = Dimensions.get('window')

const image = require('../../assets/images/icon.png')
const gradient = require('../../assets/images/gradient.png')


export const OnboardingScroller = () => {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      className='flex flex-row'
pagingEnabled={}
    >
       <View
          className='items-center flex flex-col p-4 mb-4
          w-[100vw]
          '
          >
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
                  <SvgText
                    fill="red"
                    stroke="blue"
                    fontFamily="Avenir Next"
                    x="10"
                    y="30"
                    fontSize="35"
                    fontWeight="600"
                    scale="1">
                    <TSpan>Netli.fyi</TSpan>
                  </SvgText>
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
          </View>
      <View className='w-64 h-64 bg-gray-300 rounded-lg mr-4' />
      <View className='w-64 h-64 bg-gray-300 rounded-lg mr-4' />
      <View className='w-64 h-64 bg-gray-300 rounded-lg mr-4' />
      </ScrollView>
  )
}


const Summary = styled(Text)`
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