import React, { FC } from 'react'
import { Linking, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { NetlifySite } from '../typings/netlify.d'
import { localizedRelativeFormat } from '../utilities/time'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { NavigationRow } from './row/NavigationRow'
import { Text } from './text/Text'

type Props = {
  site: NetlifySite | undefined
  name?: string
}

export const SiteInformation: FC<Props> = ({ site, name }) => {
  const openSite = () => {
    Linking.openURL(`${site?.url}`)
  }

  const openManage = () => {
    Linking.openURL(`${site?.published_deploy?.admin_url}`)
  }
  const createdAt = site?.created_at
    ? localizedRelativeFormat(new Date(`${site?.created_at}`), new Date())
    : ''

  const updatedAt = site?.updated_at
    ? localizedRelativeFormat(new Date(`${site?.updated_at}`), new Date())
    : ' '

  return (
    <>
      <CardTitle icon="info-circle" title="Details" />
      <Card>
        <NavigationRow title="Domain" value={name} />
        <Row>
          <LinkIcon />
          <Title onPress={openSite}>{name}</Title>
        </Row>
        <Row>
          <HistoryIcon />
          {site?.created_at && <Title>{`Site created ${createdAt}`}</Title>}
        </Row>
        <Row>
          <ClockIcon />
          {site?.updated_at && <Title>{`Last publish ${updatedAt}`}</Title>}
        </Row>
        <Row last>
          <ToolsIcon />
          <Title onPress={openManage}>Manage site</Title>
        </Row>
      </Card>
    </>
  )
}

type RowProps = {
  readonly last?: boolean
}

const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: center;
  margin: 6px 0px;
  padding-bottom: 8px;
  border-bottom-width: ${({ last }) => (last ? 0 : StyleSheet.hairlineWidth)}px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`

const LinkIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'link',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const ClockIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'clock',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const HistoryIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'history',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const ToolsIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'tools',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
`

const Link = styled(Text)`
  color: ${({ theme }) => theme.accentColor};
  text-transform: capitalize;
`

const SummaryText = styled(Text)`
  line-height: 20px;
`
