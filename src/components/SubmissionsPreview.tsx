import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Submission } from '../typings/netlify.d'
import { Text } from './Typography'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SubmissionItem } from './SubmissionItem'
import { useNavigation } from '@react-navigation/native'

type Props = {
  submissions?: Array<Submission>
  siteID: string
  siteName: string
}
export const SubmissionsPreview: FC<Props> = ({
  submissions,
  siteID,
  siteName
}) => {
  const shownSubmissions = submissions?.slice(0, 3)
  const navigation = useNavigation()

  const goToSubmissions = () => {
    navigation.navigate('Submissions', {
      siteID,
      name: siteName
    })
  }

  return (
    <>
      <TitleContainer>
        <Icon name="envelope" size={15} solid />
        <CardTitle type="Title 3">Recent form submissions</CardTitle>
      </TitleContainer>

      <Card>
        {shownSubmissions?.map((submission) => {
          const navigate = () => {
            navigation.navigate('Submission', {
              name: siteName,
              submissionID: submission?.id
            })
          }

          return (
            <SubmissionItem
              key={submission.id}
              submission={submission}
              navigate={navigate}
            />
          )
        })}
        {submissions && submissions?.length > 3 ? (
          <Container>
            <ShowMoreButton onPress={goToSubmissions}>
              <ButtonText>Show more</ButtonText>
            </ShowMoreButton>
          </Container>
        ) : null}
      </Card>
    </>
  )
}

const Card = styled.View`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 8px 16px;
  margin: 8px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
`

const CardTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`

const Icon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.primaryTextColor
}))`
  margin-right: 8px;
`
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 8px 8px;
`

const Container = styled.View``

const ShowMoreButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const ButtonText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.accentColor};
  font-size: 13px;
  font-weight: bold;
`
