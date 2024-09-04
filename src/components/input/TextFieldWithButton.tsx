import { Typography } from '@components/layout/Typography'
import { useRef } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import colors from 'tailwindcss/colors'

type State = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  onPress: () => void
  buttonText: string
  buttonDisabled?: boolean
  state?: State
} & TextInputProps

export const TextFieldWithButton = ({
  onPress,
  buttonDisabled,
  buttonText,
  state,
  ...props
}: Props) => {
  const ref = useRef<TextInput>(null)

  const _onPress = () => {
    ref.current?.blur()
    onPress()
  }

  return (
    <View className="bg-gray-200 rounded-lg flex-row">
      <TextInput
        ref={ref}
        className="px-2 py-4 mr-20"
        {...props}
        style={s.reset}
        returnKeyType="done"
        onSubmitEditing={_onPress}
      />

      {state === 'success' && (
        <Animated.View
          className="absolute right-0  bottom-0 top-0 justify-center items-center pr-2"
          entering={FadeIn}
          exiting={FadeOut}>
          <FontAwesome5Icon
            size={16}
            name="check-circle"
            color={colors.cyan[500]}
          />
        </Animated.View>
      )}

      {state === 'error' && (
        <Animated.View
          className="absolute right-0  bottom-0 top-0 justify-center items-center pr-2"
          entering={FadeIn}
          exiting={FadeOut}>
          <FontAwesome5Icon
            size={16}
            name="exclamation-triangle"
            color={colors.red[500]}
          />
        </Animated.View>
      )}

      {state === 'loading' && (
        <Animated.View
          className="absolute right-0  bottom-0 top-0 justify-center items-center pr-2"
          entering={FadeIn}
          exiting={FadeOut}>
          <ActivityIndicator color={colors.blue[500]} />
        </Animated.View>
      )}

      {state === 'idle' && !buttonDisabled && (
        <Animated.View
          className="absolute right-0  bottom-0 top-0 justify-center items-center"
          entering={FadeIn}
          exiting={FadeOut}>
          <TouchableOpacity
            disabled={buttonDisabled}
            className=" bg-blue-500 justify-center items-center px-2 py-2 mr-2 rounded-md"
            onPress={_onPress}>
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
