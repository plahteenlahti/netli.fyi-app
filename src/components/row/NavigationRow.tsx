import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { HStack } from '../layout/HStack'
import { Typography } from '../layout/Typography'
import { LoadingView } from '../Loader'

type Props = {
  title: string
  value?: string | number
  hideDivider?: boolean
  type?: 'info' | 'navigation' | 'action'
  loading?: boolean
} & TouchableOpacityProps

export const NavigationRow = ({
  title,
  value,
  type = 'info',
  hideDivider = false,
  loading,
  ...buttonProps
}: Props) => {
  return (
    <TouchableOpacity disabled={type === 'info'} {...buttonProps}>
      <View
        className={`flex-row justify-between items-center gap-1 min-h-[60] ${
          hideDivider ? '' : 'border-b border-gray-200'
        } py-2 pr-4 ml-2`}>
        <Typography className="">{title}</Typography>

        <HStack alignItems="center">
          {loading ? (
            <LoadingView className="w-[100] h-[20] rounded-lg" />
          ) : (
            <Typography secondary className="font-regular text-right text-base">
              {value}
            </Typography>
          )}
          {!loading && type === 'navigation' && (
            <Chevron name="chevron-right" />
          )}
        </HStack>
      </View>
    </TouchableOpacity>
  )
}

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))`
  margin-left: 8px;
`

const s = StyleSheet.create({})
