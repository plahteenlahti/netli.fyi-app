import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { HContainer } from '../layout/Container'

type Props = {
  title: string
  value?: string | number
} & TouchableOpacityProps

export const NavigationRow = ({ title, value, ...buttonProps }: Props) => {
  return (
    <TouchableOpacity {...buttonProps}>
      <RowContainer>
        <Text>{title}</Text>

        <HContainer alignItems="center">
          <Text fontFamily="Inter-Regular" color="secondaryTextColor">
            {value}
          </Text>
          <Chevron name="chevron-right" />
        </HContainer>
      </RowContainer>
    </TouchableOpacity>
  )
}

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))`
  margin-left: 8px;
`
