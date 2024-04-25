import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { Typography } from '../layout/Typography'

type Props = {
  title: string
  editHint?: string
  value?: string | number
  hideDivider?: boolean
} & TextInputProps

export const FormRow = <T extends FieldValues>({
  title,
  editHint,
  name,
  control,
  hideDivider = false,
  ...rest
}: Props & UseControllerProps<T>) => {
  const { field } = useController({
    name,
    control
  })
  return (
    <View
      className={`${
        hideDivider ? '' : 'border-b border-gray-200'
      } pt-2 pb-2 pr-4 ml-2`}>
      <View className="flex-row justify-between items-center gap-1 pb-2">
        <Text className="font-medium text-base flex-1 text-gray-800">
          {title}
        </Text>

        <View className="flex-1">
          <TextInput
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
            editable={field.disabled}
            className="font-regular text-gray-500 text-right text-base p-0"
            value={field.value}
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
