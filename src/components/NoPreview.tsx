import { View, ViewProps } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export const NoPreview = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={`bg-gray-500 h-full w-full justify-center items-center ${className}`}
      {...rest}>
      <FontAwesome5 color="red" size={25} name="safari" brand />
    </View>
  )
}
