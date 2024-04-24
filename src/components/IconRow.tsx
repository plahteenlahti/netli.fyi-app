import { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { HContainer } from './layout/Container'
import { RowContainer } from './row/RowContainer'
import { Text } from './text/Text'

type Props = {
  icon: string
  brands?: boolean
  solid?: boolean
  title: string
  action: () => void
  hideDivider?: boolean
}

export const IconRow: FC<Props> = ({
  icon,
  title,
  action,
  brands,
  solid,
  hideDivider
}) => {
  return (
    <CardRow onPress={action}>
      <RowContainer hideDivider={hideDivider}>
        <HContainer justifyContent="space-between" flex={1}>
          <HContainer>
            <CardIcon name={icon} size={16} brands={brands} solid={solid} />
            <CardText>{title}</CardText>
          </HContainer>

          <Chevron name="chevron-right" size={15} brands />
        </HContainer>
      </RowContainer>
    </CardRow>
  )
}

const CardIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))`
  margin-right: 16px;
`

const CardRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const CardText = styled(Text)`
  font-size: 15px;
  color: ${({ theme }) => theme.primaryTextColor};
`
