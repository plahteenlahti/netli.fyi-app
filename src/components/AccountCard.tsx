import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { Account } from '../typings/netlify.d'
import { UsageCard } from './account/UsageCard'
import { Card } from './Card'
import { PlaceholderIcon } from './PlaceholderIcon'

type Props = {
  account: Account
  selected: boolean
}

const getBarWidth = (val: number, max: number, min: number) => {
  const normalized = (val - min) / (max - min)
  if (normalized < 0.05) {
    return '5%'
  } else {
    return normalized * 100 + '%'
  }
}

export const AccountCard: FC<Props> = ({ account }) => {
  return (
    <Card>
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

          <TypeContainer>
            <Type>{account.type_name}</Type>
          </TypeContainer>

          <BillingAccount>
            Billing email: {account.billing_email}
          </BillingAccount>

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
  padding: 3px 5px;
  border-radius: 8px;
  right: 16px;
  top: 12px;
`

const HContainer = styled.View`
  flex-direction: row;
`

const VContainer = styled.View`
  flex: 1;
`

const Type = styled.Text`
  text-transform: uppercase;
  font-size: 10px;
  color: ${({ theme }) => theme.primaryBackground};
`

const BillingAccount = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
`

const CardTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const AccountName = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 15px;
  margin-left: 8px;
`

const DataText = styled.Text`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
`

const ProgressBarOuter = styled.View`
  height: 4px;
  border-radius: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const ProgressBarInner = styled(Animated.View)`
  border-radius: 4px;
  height: 100%;
  background-color: ${({ theme }) => theme.accentColor};
`
