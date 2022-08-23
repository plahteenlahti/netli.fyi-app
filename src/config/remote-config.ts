import remoteConfig from '@react-native-firebase/remote-config'
import { useEffect } from 'react'
import configuration from 'react-native-ultimate-config'

// These must match the ones in firebase console
type DefaultValues = {
  iap_enabled: boolean
  netlify_oauth_settings: string
  version: number
}

const VALUES: DefaultValues = {
  iap_enabled: false,
  netlify_oauth_settings: JSON.stringify({
    clientId: configuration.client_id,
    clientSecret: configuration.client_secret,
    redirectUrl: configuration.redirect_url
  }),
  version: 0.1
}

export const useRemoteConfig = () => {
  useEffect(() => {
    remoteConfig()
      .setDefaults(VALUES)
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.')
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated'
          )
        }
      })
  }, [])
}

type ValueOf<T> = T[keyof T]

export const useRemoteValue = <T extends keyof DefaultValues>(
  key: T
): ValueOf<DefaultValues> | undefined => {
  switch (typeof VALUES[key]) {
    case 'string':
      return remoteConfig().getValue(key).asString()
    case 'number':
      return remoteConfig().getValue(key).asNumber()
    case 'boolean':
      return remoteConfig().getValue(key).asBoolean()
    default:
      return undefined
  }
}
