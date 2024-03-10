import { useMutation, useQuery } from '@tanstack/react-query'
import Purchases, { PurchasesPackage } from 'react-native-purchases'

const ENTITLEMENT_ID = 'pro_large_tip_netli.fyi'

export const useCustomerInfo = () => {
  return useQuery({
    queryKey: ['customerInfo'],
    queryFn: async () => await Purchases.getCustomerInfo()
  })
}

export const useCurrentOfferings = () => {
  return useQuery({
    queryKey: ['offerings'],
    queryFn: async () => await Purchases.getOfferings()
  })
}

export const usePurchasePackage = () => {
  return useMutation({
    onMutate: async (offering: PurchasesPackage) => {
      const purchase = await Purchases.purchasePackage(offering)
      return purchase
    },
    onError: (error, variables, context) => {
      console.error(error)
    }
  })
}
