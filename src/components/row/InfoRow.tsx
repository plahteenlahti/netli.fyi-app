import { View } from 'react-native'
import { Typography } from '../layout/Typography'

type Props = {
  title: string
  editHint?: string
  value?: string | number
  hideDivider?: boolean
}

export const InfoRow = ({
  title,
  editHint,
  value,
  hideDivider = false
}: Props) => {
  return (
    <View
      className={`${
        hideDivider ? '' : 'border-b border-gray-200'
      } pt-2 pb-2 pr-4 ml-2`}>
      <View className={'flex-row justify-between items-center gap-1'}>
        <Typography className="font-medium text-base flex-1 text-gray-800">
          {title}
        </Typography>

        <View className="flex-1">
          <Typography className="font-regular text-gray-500 flex-1 text-right text-base">
            {value}
          </Typography>
        </View>
      </View>
      <Typography className="text-xs font-normal text-gray-400">
        {editHint}
      </Typography>
    </View>
  )
}
