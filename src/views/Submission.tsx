import { NativeStackScreenProps } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import { Card } from '@components/Card'
import { Text } from '@components/text/Text'
import { useSubmission } from '@hooks/submissions'
import { RootStackParamList } from '@navigators/RootStack'

export const Submission = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'Submission'>) => {
  const { submissionID } = route.params
  const { data: submission } = useSubmission(submissionID)

  return (
    <Container>
      <ScrollView>
        <Card>
          <Row>
            <Title>Form</Title>
            <Description>{submission?.form_name}</Description>
          </Row>
          {submission?.ordered_human_fields?.map(field => (
            <Row key={field.name}>
              <Title>{field.title}</Title>
              <Description>{field.value}</Description>
            </Row>
          ))}
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
