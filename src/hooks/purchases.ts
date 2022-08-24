import { useEffect } from 'react'
import { Platform } from 'react-native'
import Purchases from 'react-native-purchases'
import { useRemoteValue } from '../config/remote-config'

export const usePurchases = () => {
  const iosKey = useRemoteValue('revenuecat_key')

  useEffect(() => {
    const setUpPurchases = async () => {
      if (Platform.OS === 'ios') {
        await Purchases.setup(iosKey)
      } else if (Platform.OS === 'android') {
        await Purchases.setup('public_google_sdk_key')
      }
    }

    setUpPurchases()
  }, [iosKey])
}
