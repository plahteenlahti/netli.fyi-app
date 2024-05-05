import styled from 'styled-components/native'
import { Card } from '../components/Card'
import { BuildItem } from '../components/list-items/build'
import { useBuilds } from '@hooks/build'

export const Builds = () => {
  const { data } = useBuilds('plahteenlahti-6nrl7-g')

  return (
    <Container>
      <ScrollView>
        <Card>
          {data?.map(build => (
            <BuildItem key={build?.id} build={build} />
          ))}
        </Card>
      </ScrollView>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
  flex: 1;
`
