import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Card } from '../components/Card'
import { Layout } from '../components/layout/Layout'
import { InfoRow } from '../components/row/InfoRow'
import { useAccount } from '@hooks/account'
import { RootStackParamList } from '../navigators/RootStack'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Account'>
  route: RouteProp<RootStackParamList, 'Account'>
}

export const Account = ({ route }: Props) => {
  const account = useAccount(route.params.accountID)
  return (
    <Layout>
      <Card>
        <InfoRow title="Name" value={account.data?.name} />
        <InfoRow title="Billing name" value={account.data?.billing_name} />
        <InfoRow
          title="Billing email"
          hideDivider
          value={account.data?.billing_email}
        />
      </Card>

      <Card>
        <InfoRow title="Title" value={account.data?.site_capabilities.title} />
        <InfoRow
          title="Asset acceleration"
          value={account.data?.site_capabilities.cdn_propagation}
        />
        <InfoRow
          title="Billing email"
          hideDivider
          value={account.data?.billing_email}
        />
      </Card>
    </Layout>
  )
}
