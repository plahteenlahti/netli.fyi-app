import { ViewStyle } from 'react-native'
import { SvgXml } from 'react-native-svg'

export type Props = {
  size: number | string
  svgXml: string
  fill?: string
  stroke?: string
  style?: ViewStyle
}

const Icon = ({ svgXml, size = 30, stroke = 'none', fill }: Props) => (
  <SvgXml xml={svgXml} width={size} height={size} fill={fill} stroke={stroke} />
)

export default Icon
