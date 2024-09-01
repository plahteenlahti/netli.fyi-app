import { View, Text, ViewProps } from 'react-native'

type Props = {
  text?: string
} & ViewProps

export const Divider = ({ text, ...rest }: Props) => (
  <View className="justify-center items-center flex-1 w-full" {...rest}>
    <View className="absolute h-px bg-gray-200 w-full" />
    {text && (
      <Text className="bg-white text-gray-500 px-5 font-medium">{text}</Text>
    )}
  </View>
)
