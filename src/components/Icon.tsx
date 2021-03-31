import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import { SvgXml } from 'react-native-svg'

export type Props = {
  size: number | string
  svgXml: string
  fill?: string
  stroke?: string
  style?: ViewStyle
}

const Icon: FC<Props> = ({ svgXml, size = 30, stroke = 'none', fill }) => (
  <SvgXml xml={svgXml} width={size} height={size} fill={fill} stroke={stroke} />
)

export default Icon
