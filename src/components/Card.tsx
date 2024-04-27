import { ReactNode } from 'react'
import { TextProps, View, ViewStyle } from 'react-native'
import { Typography } from './layout/Typography'

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

Card.Title = ({ children, className, ...rest }: TextProps) => {
  return (
    <Typography
      className={`text-xs text-gray-600 font-medium uppercase ml-2 ${className}`}
      {...rest}>
      {children}
    </Typography>
  )
}
