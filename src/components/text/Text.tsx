import React from 'react'
import { StyleProp, TextProps, TextStyle, Text as RNText } from 'react-native'
import styled, { css } from 'styled-components/native'
import { Color } from '../../styles/theme'

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

// Large Title	Regular	34	41
// Title 1	Regular	28	34
// Title 2	Regular	22	28
// Title 3	Regular	20	25
// Headline	Semi-Bold	17	22
// Body	Regular	17	22
// Callout	Regular	16	21
// Subhead	Regular	15	20
// Footnote	Regular	13	18
// Caption 1	Regular	12	16
// Caption 2	Regular	11	13
const largeTitle = css`
  font-size: 34px;
  line-height: 41px;
`

const title1 = css`
  font-size: 28px;
  line-height: 34px;
`

const title2 = css`
  font-size: 28px;
  line-height: 22px;
`
const title3 = css`
  font-size: 20px;
  line-height: 25px;
`

const headline = css`
  font-size: 17px;
  line-height: 22px;
  font-weight: bold;
`

const body = css`
  font-size: 17px;
  line-height: 22px;
`

const callout = css`
  font-size: 16px;
  line-height: 21px;
`
const subhead = css`
  font-size: 15px;
  line-height: 20px;
`

const footnote = css`
  font-size: 13px;
  line-height: 18px;
`

const caption1 = css`
  font-size: 12px;
  line-height: 16px;
`

const caption2 = css`
  font-size: 11px;
  line-height: 13px;
`
