import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Card } from '@components/Card'
import { Layout } from '@components/layout/Layout'
import { InfoRow } from '@components/row/InfoRow'
import { useAccount } from '@hooks/account'
import { RootStackParamList } from '@navigators/RootStack'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Account'>
  route: RouteProp<RootStackParamList, 'Account'>
}

export const Account = ({ route }: Props) => {
  const account = useAccount(route.params.accountID)

  console.log(JSON.stringify(account.data, null, 2))
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
        <InfoRow title="Capa" value={account.data?.billing_email} />

        <InfoRow
          title="Billing email"
          hideDivider
          value={account.data?.billing_email}
        />
      </Card>
    </Layout>
  )
}
