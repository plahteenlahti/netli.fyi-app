import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

type Props = {
  children?: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return <Container>{children}</Container>
}

const Container = styled(SafeAreaView)`
  flex: 1;
`
