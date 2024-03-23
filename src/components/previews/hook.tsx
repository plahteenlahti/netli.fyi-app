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
import { View } from 'react-native'

type Props = {
  hooks?: Array<Hook>
  siteID: string
  siteName: string
}

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Site'>

export const HooksPreview: FC<Props> = ({ hooks, siteName }) => {
  const navigation = useNavigation<Navigation>()
  const shownHooks = hooks?.slice(0, 5)

  console.log(JSON.stringify(hooks, null, 2))

  const rows = buildInfoRows(shownHooks)

  const goToDeploys = () => {}

  return (
    <>
      <CardTitle title="Web hooks" icon="code-branch" />
      <Card>
        {rows?.map((hook, index) => {
          // const navigate = () => {
          //   navigation.navigate('Hook', {
          //     name: siteName,
          //     hookID: hook?.id
          //   })
          // }

          return (
            <View key={hook}>
              <Text className="text-xs font-normal tex">{hook}</Text>
            </View>
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

function buildInfoRows(events: Hook[]): string[] {
  return events
    .map(event => {
      switch (event.type) {
        case 'github_app_commit_status':
          switch (event.event) {
            case 'deploy_building':
              return 'Add deploy state commit checks when Deploy Preview starts'
            case 'deploy_created':
              return 'Add deploy state commit checks when Deploy Preview succeeds'
            case 'deploy_failed':
              return 'Add deploy state commit checks when Deploy Preview fails'
            default:
              return ''
          }
        case 'github_app_checks':
          switch (event.event) {
            case 'deploy_building':
              return 'Add deploy summary commit checks when Deploy Preview starts'
            case 'deploy_created':
              return 'Add deploy summary commit checks when Deploy Preview succeeds'
            case 'deploy_failed':
              return 'Add deploy summary commit checks when Deploy Preview fails'
            default:
              return ''
          }
        case 'email':
          switch (event.event) {
            case 'deploy_request_pending':
              return `Email ${event.data.email} when deploy request is pending`
            case 'deploy_request_accepted':
              return `Email ${event.data.email} when deploy request is accepted`
            case 'deploy_request_rejected':
              return `Email ${event.data.email} when deploy request is rejected`
            default:
              return ''
          }
        case 'github_app_review_comment':
          switch (event.event) {
            case 'deploy_request_pending':
              return 'Add Deploy Preview links to pull request comments when deploy request is pending'
            case 'deploy_request_accepted':
              return 'Add Deploy Preview links to pull request comments when deploy request is accepted'
            case 'deploy_request_rejected':
              return 'Add Deploy Preview links to pull request comments when deploy request is rejected'
            default:
              return ''
          }
        default:
          return ''
      }
    })
    .filter(row => row !== '')
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
