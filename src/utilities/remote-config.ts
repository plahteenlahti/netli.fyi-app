import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchRemoteConfig } from '../api/remote-config'

/* Work in progress */

export const loadRemoteConfig = async <T>(
  id: string,
  skipCached = false
): Promise<T | undefined> => {
  try {
    if (skipCached) {
      return loadAndStoreRemoteConfig(id)
    }

    const cachedRemoteConfig = await AsyncStorage.getItem(`$netlifyi-${id}`)
    if (!cachedRemoteConfig) {
      __DEV__ && console.log(`No cache hit for config ${id}`)
      return loadAndStoreRemoteConfig(id)
    } else {
      loadAndStoreRemoteConfig(id)
      return JSON.parse(cachedRemoteConfig)
    }
  } catch (e) {
    console.log(encodeURIComponent)
    return undefined
  }
}

const loadAndStoreRemoteConfig = async <T>(id: string): Promise<T> => {
  const config = await fetchRemoteConfig(id)

  __DEV__ && console.log('Loaded remote configuration', config)
  if (config) {
    await AsyncStorage.setItem(`$netlifyi-${id}`, JSON.stringify(config))
  }
  return config as T
}
