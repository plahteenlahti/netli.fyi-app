import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import 'react-native-gesture-handler'
import { LumiThemeProvider } from 'react-native-lumi'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/native'
import { navigationRef } from './src/navigators/RootNavigation'
import { SiteStack } from './src/navigators/RootStack'
import { persistor, store } from './src/store/store'
import { darkTheme, lightTheme } from './src/styles/theme'

enableScreens()

const queryClient = new QueryClient()

const App = () => {
  const colorScheme = useColorScheme()

  useEffect(() => {
    const init = async () => {}

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true })
    })
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>
              <StatusBar
                translucent
                barStyle={
                  colorScheme === 'dark' ? 'light-content' : 'dark-content'
                }
              />
              <LumiThemeProvider>
                <ThemeProvider
                  theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
                  <SiteStack />
                </ThemeProvider>
              </LumiThemeProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
