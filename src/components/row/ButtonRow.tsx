import { TouchableHighlight, TouchableOpacityProps, View } from 'react-native'
import { Typography } from '../layout/Typography'
import { RowContainerProps } from './RowContainer'

type ButtonType = 'action' | 'destructive'

type Props = {
  title: string
  type?: ButtonType
} & TouchableOpacityProps &
  RowContainerProps

export const ButtonRow = ({
  title,
  type = 'action',
  hideDivider,
  ...buttonProps
}: Props) => {
  return (
    <TouchableHighlight {...buttonProps} underlayColor="#fff">
      <View
        className={`${
          hideDivider ? '' : 'border-b border-gray-200'
        } pt-4 pb-4 pr-4 ml-2`}>
        <Typography
          className={`
            font-medium
            text-base
            flex-1
            ${type === 'action' ? 'text-blue-500' : 'text-red-500'}
        `}>
          {title}
        </Typography>
      </View>
    </TouchableHighlight>
  )
}
