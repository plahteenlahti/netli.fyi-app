import { Layout } from '@components/layout/Layout'
import { Text } from '@components/text/Text'
import { View } from 'react-native'
import { useAppSelector } from '../store/store'

export const Profiles = () => {
  const profiles = useAppSelector(({ accounts }) => accounts.accounts)

  return (
    <Layout>
      <Text type="hero">Profiles</Text>
      {profiles.map(profile => (
        <View>
          <Text>{profile.name}</Text>
        </View>
      ))}
    </Layout>
  )
}
