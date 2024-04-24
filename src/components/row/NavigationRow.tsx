import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { HStack } from '../layout/HStack'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'

type Props = {
  title: string
  value?: string | number
  hideDivider?: boolean
  type?: 'info' | 'navigation' | 'action'
} & TouchableOpacityProps

export const NavigationRow = ({
  title,
  value,
  type = 'info',
  hideDivider = false,
  ...buttonProps
}: Props) => {
  return (
    <TouchableOpacity disabled={type === 'info'} {...buttonProps}>
      <RowContainer hideDivider={hideDivider}>
        <Text>{title}</Text>

        <HStack alignItems="center">
          <Text fontFamily="Inter-Regular" color="secondaryTextColor">
            {value}
          </Text>
          {type === 'navigation' && <Chevron name="chevron-right" />}
        </HStack>
      </RowContainer>
    </TouchableOpacity>
  )
}

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))`
  margin-left: 8px;
`
