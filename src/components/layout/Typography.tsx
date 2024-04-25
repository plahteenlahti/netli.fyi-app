import { Text } from 'react-native'
import { TextProps } from 'react-native'

type Props = {
  children: React.ReactNode
  secondary?: boolean
} & TextProps

export const Typography = ({
  secondary,
  className,
  children,
  ...rest
}: Props) => {
  return (
    <Text
      className={`text-base font-medium ${
        secondary
          ? 'text-gray-500 dark:text-gray-300'
          : 'text-gray-800 dark:text-gray-100'
      }
      ${className} 
      `}
      {...rest}>
      {children}
    </Text>
  )
}
