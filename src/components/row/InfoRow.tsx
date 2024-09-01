import { View } from 'react-native'
import { Typography } from '../layout/Typography'
import { LoadingView } from '@components/Loader'

type Props = {
  title?: string
  editHint?: string
  value?: string | number
  hideDivider?: boolean
  loading?: boolean
}

export const InfoRow = ({
  title,
  editHint,
  value,
  hideDivider = false,
  loading
}: Props) => {
  return (
    <View
      className={`${
        hideDivider ? '' : 'border-b border-gray-200'
      } py-4 pr-4 ml-2`}>
      <View className={'flex-row justify-between items-center gap-1'}>
        <Typography className="font-medium text-base flex-1 text-gray-800">
          {title}
        </Typography>

        <View className="">
          {loading ? (
            <LoadingView className="w-[100] h-[20] rounded-lg" />
          ) : (
            <Typography
              className="font-regular text-gray-500 flex-1 text-right text-base"
              style={{
                fontVariant: ['tabular-nums']
              }}>
              {value}
            </Typography>
          )}
        </View>
      </View>
      {!!editHint && (
        <Typography className="text-xs font-normal text-gray-400">
          {editHint}
        </Typography>
      )}
    </View>
  )
}
