import { Switch, SwitchProps } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '../text/Text'
import { RowContainer } from './RowContainer'

type Props = {
  title: string
  subtitle?: string
} & SwitchProps

export const ToggleRow = ({
  title,
  subtitle,
  onChange,
  ...switchProps
}: Props) => {
  return (
    <RowContainer>
      <Column>
        <Text>{title}</Text>
        <Subtitle lineHeight="looser" size={12} color="secondaryTextColor">
          {subtitle}
        </Subtitle>
      </Column>
      <Toggle onChange={onChange} {...switchProps} />
    </RowContainer>
  )
}

const Toggle = styled(Switch)``

const Column = styled.View`
  flex: 1;
  padding-right: 24px;
`

const Subtitle = styled(Text)`
  margin-top: 4px;
`
