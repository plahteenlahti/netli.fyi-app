import { View, ViewProps } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'

export const NoPreview = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={`bg-gray-500 h-full w-full justify-center items-center ${className}`}
      {...rest}>
      <IconBrowser size={25} name="safari" brands />
    </View>
  )
}

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.primaryTextColor
}))``
