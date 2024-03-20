import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Text } from '../text/Text'
import { RowContainer, RowContainerProps } from './RowContainer'

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
    <TouchableOpacity {...buttonProps}>
      <RowContainer hideDivider={hideDivider}>
        <Text color={type === 'destructive' ? 'errorColor' : 'accentColor'}>
          {title}
        </Text>
      </RowContainer>
    </TouchableOpacity>
  )
}
