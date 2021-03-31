import 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark'
    accentColor: string
    primaryTextColor: string
    secondaryTextColor: string
    borderColor: string
    primaryBackground: string
    primaryBackgroundTransparent: string
    secondaryBackground: string
    errorColor: string
    successColor: string

    bonePrimary: string
    boneSecondary: string
  }
}
