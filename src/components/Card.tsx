import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  style?: ViewStyle
  padding?: boolean
  children?: ReactNode
}

export const Card = ({ children, style, padding = true }: Props) => {
  return (
    <View style={style} className="px-4 py-2 bg-">
      {children}
    </View>
  )
}

const Container = styled.View<Props>`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: ${({ padding }) => (padding ? ' 8px 16px' : '0px')};
  margin: 0px 16px 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
  elevation: 3;
`
