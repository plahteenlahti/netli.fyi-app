import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Account } from '../typings/netlify.d'
import { Card } from './Card'
import { PlaceholderIcon } from './PlaceholderIcon'

type Props = {
  account: Account
}

export const AccountCard: FC<Props> = ({ account }) => {
  return (
    <Card>
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

      <BillingAccount>Billing email: {account.billing_email}</BillingAccount>
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
