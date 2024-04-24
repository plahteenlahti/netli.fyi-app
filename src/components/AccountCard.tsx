import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { usePrefetchAccount } from '../hooks/account'
import { RootStackParamList } from '../navigators/RootStack'
import { Account } from '../typings/netlify.d'
import { UsageCard } from './account/UsageCard'
import { Card } from './Card'
import { PlaceholderIcon } from './PlaceholderIcon'
import { Text } from './text/Text'

type Props = {
  account: Account
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>
}

export const AccountCard: FC<Props> = ({ account, navigation }) => {
  const prefetchAccount = usePrefetchAccount()

  const navigateToAccount = () => {
    navigation.navigate('Account', { accountID: account.id })
  }

  const onPressIn = () => {
    prefetchAccount(account.id)
  }

  return (
    <TouchableOpacity onPressIn={onPressIn} onPress={navigateToAccount}>
      <Card>
        <TypeContainer>
          <Type>{account.type_name}</Type>
        </TypeContainer>
        <HContainer>
          <VContainer>
            <CardTitle>
              {account?.team_logo_url ? (
                <TeamLogo source={{ uri: account?.team_logo_url }} />
              ) : (
                <PlaceholderIcon />
              )}

              <AccountName>{account.name}</AccountName>
            </CardTitle>

            <UsageCard
              min={0}
              max={account.capabilities.bandwidth.included}
              value={account.capabilities.bandwidth.used}
              title="Bandwith used"
            />
            <UsageCard
              min={0}
              max={account.capabilities.build_minutes.included}
              value={account.capabilities.build_minutes.used}
              title="Build minutes used"
            />
            <UsageCard
              min={0}
              max={account.capabilities.sites.included}
              value={account.capabilities.sites.used}
              title="Sites"
            />
          </VContainer>
        </HContainer>
      </Card>
    </TouchableOpacity>
  )
}

const TeamLogo = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: 8px;
`

const TypeContainer = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.secondaryTextColor};
  padding: 8px 16px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  left: 0px;
  top: 0px;
`

const HContainer = styled.View`
  flex-direction: row;
`

const VContainer = styled.View`
  flex: 1;
`

const Type = styled(Text)`
  text-transform: uppercase;
  font-size: 10px;
  padding: 0px 5px;
  color: ${({ theme }) => theme.primaryBackground};
`

const CardTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 16px;
`

const AccountName = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 15px;
  margin-left: 8px;
`
