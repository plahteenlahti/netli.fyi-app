import { StyleProp, TextProps, TextStyle, Text as RNText } from 'react-native'
import styled, { css } from 'styled-components/native'
import { Color } from '@styles/theme'

export type Type =
  | 'hero'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'subtitle'
  | 'body'
  | 'button'

export type FontFamily = 'Inter-Medium' | 'Inter-Regular' | 'Inter-Bold'

export const letterSpacing = {
  tight: -1.6,
  none: 0,
  loose: 0.6,
  looser: 1.5
}

export const fontSize = {
  12: '12px',
  15: '15px'
}

const lineHeightOptions = {
  tight: -1.6,
  none: 0,
  loose: 0.6,
  looser: 15
}

type Props = {
  children?: React.ReactNode
  type?: Type
  style?: StyleProp<TextStyle>
  uppercase?: boolean
  lineHeight?: keyof typeof lineHeightOptions
  letterSpacing?: keyof typeof letterSpacing
  alignCenter?: boolean
  size?: keyof typeof fontSize
  fontFamily?: FontFamily
  underline?: boolean
  bold?: boolean
  color?: Color
} & TextProps

export const Text = ({ children, ...rest }: Props & TextProps) => {
  return <AppText {...rest}>{children}</AppText>
}

const AppText = styled(RNText)<Props>`
  color: ${({ theme, color }) =>
    color ? theme[color] : theme.primaryTextColor};
  ${({ uppercase }) =>
    uppercase
      ? css`
          text-transform: uppercase;
          letter-spacing: ${letterSpacing.looser};
        `
      : css``};
  line-height: ${({ lineHeight }) =>
    lineHeight ? lineHeightOptions[lineHeight] : 0}px;
  font-family: ${({ fontFamily }) =>
    fontFamily ? fontFamily : 'Inter-Medium'};
  font-size: ${({ size }) => (size ? fontSize[size] : fontSize[15])};
`
