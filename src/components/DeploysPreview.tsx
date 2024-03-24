import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SiteNavigation } from '../navigators/RootStack'
import { Deploy } from '../typings/netlify.d'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { DeployItem } from './DeployItem'

type Props = {
  deploys?: Array<Deploy>
  siteID: string
  siteName: string
}

type Navigation = NativeStackNavigationProp<SiteNavigation, 'Site'>

export const DeploysPreview: FC<Props> = ({ deploys, siteID, siteName }) => {
  const navigation = useNavigation<Navigation>()

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
              buildID: `${deploy?.id}`
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
          <View>
            <TouchableOpacity
              className="justify-center items-center p-4"
              onPress={goToDeploys}>
              <Text className="text-center text-blue-500 text-sm font-semibold">
                Show more
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Card>
    </>
  )
}
