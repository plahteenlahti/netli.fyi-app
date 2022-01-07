import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Deploy } from '../typings/netlify.d'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { DeployItem } from './DeployItem'
import { Text } from './Typography'

type Props = {
  deploys?: Array<Deploy>
  siteID: string
  siteName: string
}

export const DeploysPreview: FC<Props> = ({ deploys, siteID, siteName }) => {
  const navigation = useNavigation()

  const shownDeploys = deploys?.slice(0, 5)

  const goToDeploys = () => {
    navigation.navigate('Deploys', {
      siteID,
      name: siteName
    })
  }

  return (
    <>
      <CardTitle icon="code-branch" title="Deploys" />
      <Card>
        {shownDeploys?.map((deploy, index) => {
          const navigate = () => {
            navigation.navigate('Deploy', {
              name: siteName,
              buildID: deploy?.id
            })
          }

          return (
            <DeployItem
              key={deploy.id}
              last={index + 1 === shownDeploys.length}
              deploy={deploy}
              navigate={navigate}
            />
          )
        })}
        {deploys && deploys?.length > 5 ? (
          <Container>
            <ShowMoreButton onPress={goToDeploys}>
              <ButtonText>Show more</ButtonText>
            </ShowMoreButton>
          </Container>
        ) : null}
      </Card>
    </>
  )
}

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 16px;
`

const ThemedIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

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
