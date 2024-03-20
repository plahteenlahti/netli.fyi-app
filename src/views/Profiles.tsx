import { VContainer } from '../components/layout/Container'
import { Layout } from '../components/layout/Layout'
import { Text } from '../components/text/Text'
import { useAppSelector } from '../store/store'

export const Profiles = () => {
  const profiles = useAppSelector(({ accounts }) => accounts.accounts)

  return (
    <Layout>
      <Text type="hero">Profiles</Text>
      {profiles.map(profile => (
        <VContainer>
          <Text>{profile.name}</Text>
        </VContainer>
      ))}
    </Layout>
  )
}
