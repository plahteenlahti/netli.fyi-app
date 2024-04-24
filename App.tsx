import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/native'
import {
  RootStack,
  RootStackParamList,
  SiteStack
} from './src/navigators/RootStack'
import { persistor, store } from './src/store/store'
import { darkTheme, lightTheme } from './src/styles/theme'
import Purchases from 'react-native-purchases'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native'

enableScreens()

// Purchases.configure({ apiKey: configuration.revenuecat_key })

const queryClient = new QueryClient()

const App = () => {
  const colorScheme = useColorScheme()

  useEffect(() => {
    const init = async () => {}

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true })
    })
  }, [])

  const routeNameRef = useRef<string>()
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null)

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer
              ref={navigationRef}
              theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              onReady={() => {
                routeNameRef.current =
                  navigationRef.current?.getCurrentRoute()?.name
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current
                const currentRouteName =
                  navigationRef.current?.getCurrentRoute()?.name

                if (previousRouteName !== currentRouteName) {
                  // maybe implement analytics
                }
                routeNameRef.current = currentRouteName
              }}>
              <QueryClientProvider client={queryClient}>
                <StatusBar
                  translucent
                  barStyle={
                    colorScheme === 'dark' ? 'light-content' : 'dark-content'
                  }
                />
                <ThemeProvider
                  theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
                  <RootStack />
                </ThemeProvider>
              </QueryClientProvider>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
