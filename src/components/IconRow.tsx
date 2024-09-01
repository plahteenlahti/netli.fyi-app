import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { RowContainer } from './row/RowContainer'
import { Text } from './text/Text'
import { View } from 'react-native'

type Props = {
  icon: string
  brands?: boolean
  solid?: boolean
  title: string
  action: () => void
  hideDivider?: boolean
}

export const IconRow = ({
  icon,
  title,
  action,
  brands,
  solid,
  hideDivider
}: Props) => {
  return (
    <CardRow onPress={action}>
      <RowContainer hideDivider={hideDivider}>
        <View>
          <View>
            <CardIcon name={icon} size={16} brand={brands} solid={solid} />
            <CardText>{title}</CardText>
          </View>

          <Chevron name="chevron-right" size={15} brand />
        </View>
      </RowContainer>
    </CardRow>
  )
}

const CardIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))`
  margin-right: 16px;
`

const CardRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const CardText = styled(Text)`
  font-size: 15px;
  color: ${({ theme }) => theme.primaryTextColor};
`
