import { Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

type Props = {
  icon: string
  extra?: string
  title: string
}

export const CardTitle = ({ icon, title, extra }: Props) => {
  return (
    <View className="mb-2 mt-4 px-4">
      <View className="flex-row items-center">
        <FontAwesome5 name={icon} size={12} solid />
        <Text className="text-xs text-gray-600 font-medium uppercase ml-2">
          {title}
        </Text>
      </View>

      {extra && <Text className="font-xs text-gray-600">{extra}</Text>}
    </View>
  )
}
