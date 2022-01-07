import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Hook } from '../../typings/netlify'
import { Card } from '../Card'
import { CardTitle } from '../CardTitle'
import { HookItem } from '../list-items/hook'
import { Text } from '../Typography'

type Props = {
  hooks?: Array<Hook>
  siteID: string
  siteName: string
}

export const HooksPreview: FC<Props> = ({ hooks, siteName }) => {
  const navigation = useNavigation()
  const shownHooks = hooks?.slice(0, 5)

  const goToDeploys = () => {}

  return (
    <>
      <CardTitle title="Web hooks" icon="code-branch" />
      <Card>
        {shownHooks?.map((hook, index) => {
          const navigate = () => {
            navigation.navigate('Hook', {
              name: siteName,
              buildID: hook?.id
            })
          }

          return (
            <HookItem
              key={hook?.id}
              last={index + 1 === shownHooks.length}
              hook={hook}
              navigate={navigate}
            />
          )
        })}
        {hooks && hooks?.length > 5 ? (
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
