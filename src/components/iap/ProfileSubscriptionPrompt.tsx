import React, { useEffect, useState } from 'react'
import deviceInfoModule from 'react-native-device-info'
import Purchases, { PurchasesOfferings } from 'react-native-purchases'

const useOfferings = () => {
  const [offerings, setOfferings] = useState<PurchasesOfferings>()

  useEffect(() => {
    const init = async () => {
      try {
        const bundle = deviceInfoModule.getBundleId()
        console.log('📱', bundle)
        const off = await Purchases.getOfferings()
        setOfferings(off)
      } catch (error) {
        console.log('🙀', error)
      }
    }

    init()
  })

  return [offerings]
}

export const ProfileSubscriptionPrompt = () => {
  const [offerings] = useOfferings()

  console.log(offerings)
  return <></>
}
