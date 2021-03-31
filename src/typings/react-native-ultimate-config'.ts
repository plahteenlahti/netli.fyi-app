declare module 'react-native-ultimate-config'

export interface ConfigVariables {
  redirect_url: string
  client_secret: string
  client_id: string
  client: string
}

declare const UltimateConfig: ConfigVariables

export default UltimateConfig
