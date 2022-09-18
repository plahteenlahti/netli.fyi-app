import React from 'react'
import { Layout } from '../components/layout/Layout'
import remoteConfig from '@react-native-firebase/remote-config'

export const FeatureFlags = () => {
  const values = remoteConfig().getAll()
  console.log(values)
  return <Layout />
}
