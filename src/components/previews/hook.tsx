import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { SiteNavigation } from '../../navigators/SitesStack'
import { Hook } from '../../typings/netlify'
import { Card } from '../Card'
import { CardTitle } from '../CardTitle'
import { HookItem } from '../list-items/hook'
import { Text } from '../text/Text'

type Props = {
  hooks?: Array<Hook>
  siteID: string
  siteName: string
}

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Site'>

export const HooksPreview: FC<Props> = ({ hooks, siteName }) => {
  const navigation = useNavigation<Navigation>()
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
              hookID: hook?.id
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

const Container = styled.View``

const ShowMoreButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const ButtonText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.accentColor};
  font-size: 13px;
  font-weight: bold;
`
