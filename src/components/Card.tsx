import { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
  padding?: boolean
  children?: ReactNode
}

export const Card = ({ children, style, padding = true }: Props) => {
  return (
    <View style={style} className="bg-white dark:bg-zinc-800 rounded-md mx-2">
      {children}
    </View>
  )
}
