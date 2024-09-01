import { Typography } from '@components/layout/Typography'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

type Props = {
  onPress: () => void
  buttonText: string
  buttonDisabled?: boolean
} & TextInputProps

export const TextFieldWithButton = ({
  onPress,
  buttonDisabled,
  buttonText,
  ...props
}: Props) => {
  return (
    <View className="bg-gray-200 rounded-lg flex-row">
      <TextInput className="px-2 py-4" {...props} style={s.reset} />
      {buttonDisabled && (
        <Animated.View
          className="absolute right-0  bottom-0 top-0 justify-center items-center"
          entering={FadeIn}
          exiting={FadeOut}>
          <TouchableOpacity
            disabled={buttonDisabled}
            className=" bg-blue-500 justify-center items-center px-2 py-2 m-2 rounded-md"
            onPress={onPress}>
            <Typography className="text-white text-xs">{buttonText}</Typography>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  reset: {
    margin: 0,
    padding: 0
  }
})
