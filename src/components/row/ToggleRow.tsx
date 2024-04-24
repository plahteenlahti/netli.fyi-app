import { Switch, SwitchProps, View } from 'react-native'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'

type Props = {
  title: string
  subtitle?: string
} & SwitchProps

export const ToggleRow = ({
  title,
  subtitle,
  onChange,
  ...switchProps
}: Props) => {
  return (
    <RowContainer>
      <View className="pr-4 flex-1">
        <Text>{title}</Text>
        <Text
          className="mt-2"
          lineHeight="looser"
          size={12}
          color="secondaryTextColor">
          {subtitle}
        </Text>
      </View>
      <Switch onChange={onChange} {...switchProps} />
    </RowContainer>
  )
}
