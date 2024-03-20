import { formatRelative } from 'date-fns'

import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '../components/Card'
import { Text } from '../components/text/Text'
import {
  useCurrentOfferings,
  useCustomerInfo,
  usePurchasePackage
} from '../hooks/iap/subscription'

export const Subscription = () => {
  const customerInfo = useCustomerInfo()
  const offerings = useCurrentOfferings()
  const purchase = usePurchasePackage()

  console.log(JSON.stringify(purchase, undefined, 2))

  return (
    <ScrollView>
      <Text type="title-1">Offerings</Text>
      {offerings.data?.current?.availablePackages.map(offering => (
        <TouchableOpacity onPress={() => purchase.mutate(offering)}>
          <Card key={offering.identifier}>
            <Text type="title-2">{offering.product.title}</Text>
            <Text type="body">{offering.product.description}</Text>
            <Text type="body">{offering.product.priceString}</Text>
          </Card>
        </TouchableOpacity>
      ))}

      <Text type="title-2">Customer info</Text>
      <Card>
        {customerInfo.data?.firstSeen && (
          <Text type="body">
            First seen{' '}
            {formatRelative(new Date(customerInfo.data?.firstSeen), new Date())}
          </Text>
        )}
        {customerInfo.data?.activeSubscriptions.map(sub => (
          <Text key={sub} type="body">
            {sub}
          </Text>
        ))}
      </Card>
    </ScrollView>
  )
}

const ScrollView = styled.ScrollView``
