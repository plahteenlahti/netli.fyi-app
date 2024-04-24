import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC } from 'react'
import styled from 'styled-components/native'
import { Card } from '../components/Card'
import { Text } from '../components/text/Text'
import { useHook } from '../hooks/hook'
import { RootStackParamList } from '../navigators/RootStack'

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Hook'>
type Route = RouteProp<RootStackParamList, 'Hook'>

type Props = {
  navigation: Navigation
  route: Route
}

export const Submission: FC<Props> = ({ route }) => {
  const { hookID } = route.params
  const { data: hook } = useHook(hookID)

  return (
    <Container>
      <ScrollView>
        <Card>
          <Row>
            <Title>Hook</Title>
            <Description>{hook?.form_name}</Description>
          </Row>
        </Card>
      </ScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const ScrollView = styled.ScrollView``

const Row = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`
const Title = styled(Text)`
  color: ${({ theme }) => theme.primaryTextColor};
  font-weight: 500;
  margin-bottom: 4px;
`
const Description = styled(Text)`
  color: ${({ theme }) => theme.secondaryTextColor};
  line-height: 20px;
`
