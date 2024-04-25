import { Text, TextInput, TextInputProps } from 'react-native'
import { View } from 'react-native'
import { Typography } from '../layout/Typography'

type Props = {
  title: string
  editHint?: string
  value?: string | number
  hideDivider?: boolean
} & TextInputProps

export const InfoRow = ({
  title,
  editHint,
  value,
  hideDivider = false,
  ...rest
}: Props) => {
  return (
    <View
      className={`${
        hideDivider ? '' : 'border-b border-gray-200'
      } py-4 pr-4 ml-2`}>
      <View className="flex-row justify-between items-center gap-1">
        <Text className="font-medium text-base flex-1 text-gray-800">
          {title}
        </Text>

        <View className="flex-1">
          <TextInput
            className="font-regular text-gray-500 flex-1 text-right text-base"
            value={value ? value.toString() : ''}
            {...rest}
          />
        </View>
      </View>
      <Typography className="text-xs font-normal text-gray-400">
        {editHint}
      </Typography>
    </View>
  )
}
