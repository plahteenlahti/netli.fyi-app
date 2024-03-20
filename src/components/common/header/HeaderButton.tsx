import styled from 'styled-components/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from '../Icon'

export const HeaderButton = () => {
  return (
    <Container>
      <ButtonIcon name="angle-left" />
    </Container>
  )
}

const Container = styled.View``

const ButtonIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.errorColor
}))``
