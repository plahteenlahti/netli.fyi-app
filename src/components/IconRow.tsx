import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled, { css } from 'styled-components/native'

type Props = {
  icon: string
  brands?: boolean
  solid?: boolean
  title: string
  action: () => void
  last?: boolean
}

export const IconRow: FC<Props> = ({
  icon,
  title,
  action,
  brands,
  solid,
  last
}) => {
  return (
    <CardRow onPress={action}>
      <CardIcon name={icon} size={20} brands={brands} solid={solid} />
      <Column last={last}>
        <CardText>{title}</CardText>
        <Chevron name="chevron-right" size={15} brands />
      </Column>
    </CardRow>
  )
}

const CardIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))`
  margin-right: 16px;
`

type ItemProps = {
  last?: boolean
}

const CardRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const Column = styled.View<ItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;

  flex: 1;
  ${({ last }) =>
    last
      ? css``
      : css`
          border-bottom-width: 1px;
          border-bottom-color: ${({ theme }) => theme.borderColor};
        `}
`

const CardText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.primaryTextColor};
`
