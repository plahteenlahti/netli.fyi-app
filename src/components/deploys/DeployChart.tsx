import { scaleLinear, scaleTime, line, curveBasis } from 'd3'
import React from 'react'
import { Dimensions } from 'react-native'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { useDeploys } from '../../hooks/deploy'

type Props = {
  siteID: string
}

export const DeployChart = ({ siteID }: Props) => {
  const { data: deploys } = useDeploys(siteID, { per_page: 50 })

  const data = deploys?.map((deploy, index) => ({
    x: index,
    y: deploy.deploy_time ?? 100
  }))

  console.log(data?.length)

  if (!data) {
    return null
  }

  const getDomain = (domain: number[]) => [
    Math.min(...domain),
    Math.max(...domain)
  ]

  const φ = (1 + Math.sqrt(5)) / 2
  const { width, height: wHeight } = Dimensions.get('window')
  const height = (1 - 1 / φ) * wHeight
  const strokeWidth = 2
  const padding = strokeWidth / 2

  const x = scaleLinear()
    .domain(getDomain(data.map(val => val.x)))
    .range([0, width])

  const y = scaleLinear()
    .domain(getDomain(data.map(val => val.y)))
    .range([height - padding, padding])

  const d = line<{ x: number; y: number }>()
    .x(p => x(p.x))
    .y(p => y(p.y))
    .curve(curveBasis)(data) as string

  return (
    <Svg width={300} height={300}>
      <Defs>
        <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor="#cee3f9" />
          <Stop offset="80%" stopColor="#ddedfa" />
          <Stop offset="100%" stopColor="#feffff" />
        </LinearGradient>
      </Defs>

      <Path
        d={`${d}L ${width} ${height} L 0 ${height}`}
        fill="url(#gradient)"
      />
      <Path fill="transparent" stroke="#3977e3" {...{ d, strokeWidth }} />
    </Svg>
  )
}
