import React from 'react'
import { ViewStyle } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type Props = {
  name: string
  style?: ViewStyle
}

export const Icon = ({ name, style }: Props) => {
  return <FontAwesome5 style={style} name={name} />
}
