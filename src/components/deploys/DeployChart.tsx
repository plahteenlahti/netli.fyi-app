import { curveBasis, line, scaleLinear } from 'd3'
import React from 'react'
import { Dimensions } from 'react-native'
import { parse } from 'react-native-redash'
import Svg, {
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text
} from 'react-native-svg'
import { useTheme } from 'styled-components'
import styled from 'styled-components/native'
import { useDeploys } from '../../hooks/deploy'

type Props = {
  siteID: string
}

type GraphIndex = number

export const DeployChart = ({ siteID }: Props) => {
  const { data: deploys } = useDeploys(siteID, { per_page: 50 })
  const { secondaryTextColor, accentColor } = useTheme()
  const data = deploys?.map((deploy, index) => ({
    x: index,
    y: deploy.deploy_time ?? 100
  }))

  if (!data) {
    return null
  }

  const getDomain = (domain: number[], padding: number = 0) => [
    Math.min(...domain) + padding,
    Math.max(...domain) + padding
  ]

  const φ = (1 + Math.sqrt(2)) / 2
  const { width: wWidth, height: wHeight } = Dimensions.get('window')
  const height = (1 - 1 / φ) * wHeight
  const strokeWidth = 2
  const padding = strokeWidth / 2
  const width = wWidth - 2 * 16 - 2 * 16

  const x = scaleLinear()
    .domain(getDomain(data.map(val => val.x)))
    .range([0, width])

  const y = scaleLinear()
    .domain(
      getDomain(
        data.map(val => val.y),
        10
      )
    )
    .range([height - padding, padding])

  const d = line<{ x: number; y: number }>()
    .x(p => x(p.x))
    .y(p => y(p.y))
    .curve(curveBasis)(data) as string

  const path = parse(d)

  const maxTick = Math.ceil(Math.max(...data.map(val => val.y)) / 10) * 10

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor="red" />
          <Stop offset="50%" stopColor="green" />
          <Stop offset="100%" stopColor="green" />
        </LinearGradient>
      </Defs>

      <Path fill="transparent" stroke="#3C62D7" {...{ d, strokeWidth }} />

      <G>
        <Line
          stroke={secondaryTextColor}
          strokeWidth={0.25}
          x1={0}
          x2={width}
          y1={y(maxTick)}
          y2={y(maxTick)}
        />
        <StyledText alignmentBaseline="middle" x={5} y={y(maxTick)}>
          {maxTick}
        </StyledText>
      </G>
    </Svg>
  )
}

const StyledText = styled(Text).attrs(({ theme }) => ({
  fill: theme.secondaryTextColor
}))``
