import React, from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'


export const Builds = () => {
    return (
        <Container
        edges={
          Platform.OS === 'ios' ? ['top', 'right', 'left'] : ['right', 'left']
        }>



        </Container>
    )
}


const Container = styled(SafeAreaView)`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
  flex: 1;
`
