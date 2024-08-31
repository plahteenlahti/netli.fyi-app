import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Text } from '../text/Text'

const getBarWidth = (val: number, max: number, min: number) => {
  const normalized = (val - min) / (max - min)
  if (normalized < 0.05) {
    return '1%'
  } else {
    return normalized * 100 + '%'
  }
}

type Props = {
  max: number
  min: number
  value: number
  title: string
}

export const UsageCard = ({ max, min, value, title }: Props) => {
  return (
    <View className="flex-1">
      <Text className="text-sm text-gray-600 mb-2">
        {title} {`${value} / ${max}`}
      </Text>
      <View className="h-1 bg-gray-200 rounded-md overflow mb-2">
        <Animated.View
          className="rounded-md h-full bg-blue-600"
          style={{
            width: getBarWidth(value, max, min)
          }}
        />
      </View>
    </View>
  )
}
