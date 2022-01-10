import { DefaultTheme } from 'styled-components/native'

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  accentColor: '#de25a8',
  primaryTextColor: '#f7f8f8',
  secondaryTextColor: '#8a8f98',
  borderColor: '#303236',
  primaryBackground: '#1c1d1f',
  primaryBackgroundTransparent: 'rgba(28, 29, 31, 0.8)',
  secondaryBackground: '#27282b',
  errorColor: '#FE453B',
  successColor: '#2CD057',

  bonePrimary: '#121212',
  boneSecondary: '#333333'
}

export const lightTheme: DefaultTheme = {
  mode: 'light',
  accentColor: '#ea4c89',
  primaryTextColor: '#2e3c42',
  secondaryTextColor: '#6b6f76',
  borderColor: '#e5e7eb',
  primaryBackground: '#F4F4F3',
  primaryBackgroundTransparent: 'rgba(244, 245, 248, 0.8)',
  secondaryBackground: '#fefefe',
  errorColor: '#FB4A3E',
  successColor: '#36934C',

  bonePrimary: '#E1E9EE',
  boneSecondary: '#F2F8FC'
}
