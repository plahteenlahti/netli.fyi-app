import { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled, { css } from 'styled-components/native'
import { NetlifySite } from '../typings/netlify.d'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { Text } from './text/Text'

type Props = {
  site?: NetlifySite
}

export const BuildSettings: FC<Props> = ({ site }) => {
  // console.log(JSON.stringify(site?.build_settings, undefined, 2))
  return (
    <>
      <CardTitle icon="info-circle" title="Build settings" />
      <Card>
        <Row>
          <Icon name="terminal" />
          <Title>{site?.build_settings?.cmd}</Title>
        </Row>
        <Row>
          <Icon name="terminal" />
          <Title>{site?.build_settings?.dir}</Title>
        </Row>
        <Row last>
          <Icon name="server" />
          <Title>{site?.build_image}</Title>
        </Row>
      </Card>
    </>
  )
}

type RowProps = {
  last?: boolean
}
const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: center;
  margin: ${({ theme }) => theme.spacing(1)}px 0px;
  ${({ last }) =>
    last
      ? css``
      : css`
          padding-bottom: ${({ theme }) => theme.spacing(2)}px;
          border-bottom-width: 1px;
          border-bottom-color: ${({ theme }) => theme.borderColor};
        `}
`

const Icon = styled(FontAwesome5).attrs(({ theme }) => ({
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
`
