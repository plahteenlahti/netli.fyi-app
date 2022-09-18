import React from 'react'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'

type Props = {
  title: string
  value?: string | number
  hideDivider?: boolean
}

export const InfoRow = ({ title, value, hideDivider = false }: Props) => {
  return (
    <RowContainer hideDivider={hideDivider}>
      <Text>{title}</Text>
      <Text fontFamily="Inter-Regular" color="secondaryTextColor">
        {value}
      </Text>
    </RowContainer>
  )
}
