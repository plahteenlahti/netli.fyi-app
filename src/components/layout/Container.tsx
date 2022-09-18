import { ViewProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  justifyContent?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['justifyContent']
  flex?: ViewStyle['flex']
} & ViewProps

export const VContainer = styled.View.attrs((props: Props) => ({
  justifyContent: props.justifyContent,
  alignItems: props.alignItems
}))`
  flex-direction: column;
`

export const HContainer = styled.View.attrs((props: Props) => ({
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  flex: props.flex
}))`
  flex-direction: row;
`
