import { useMutation, useQuery } from '@tanstack/react-query'
import Purchases, { PurchasesPackage } from 'react-native-purchases'

const ENTITLEMENT_ID = 'pro_large_tip_netli.fyi'

export const useCustomerInfo = () => {
  return useQuery(
    ['customerInfo'],
    async () => await Purchases.getCustomerInfo()
  )
}

export const useCurrentOfferings = () => {
  return useQuery(['offerings'], async () => await Purchases.getOfferings())
}

export const usePurchasePackage = () => {
  return useMutation((p: PurchasesPackage) => Purchases.purchasePackage(p))
}
