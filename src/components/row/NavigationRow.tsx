import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type Props = {
  title: string
} & TouchableOpacityProps

export const NavigationRow = ({ title, ...buttonProps }: Props) => {
  return (
    <TouchableOpacity {...buttonProps}>
      <RowContainer>
        <Text>{title}</Text>
        <Chevron />
      </RowContainer>
    </TouchableOpacity>
  )
}

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``
