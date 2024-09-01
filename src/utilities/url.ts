import { Alert, Linking } from 'react-native'

// get rid of http:// or https:// and wwww, use first url,
export const formatUrl = (url?: string) => {
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?/i
  const formattedUrl = url?.replace(urlRegex, '')
  return formattedUrl
}

export const openURL = async (url: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.warn(`Cannot open URL: ${url}`)
    }
  } catch (error) {
    console.warn('An error occurred', error)
  }
}

export const promptOpenURL = (url: string) => () => {
  Alert.alert(
    'Open in browser',
    'This link will navigate you to an external website in a new browser window.',
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Open',
        onPress: () => {
          openURL(url)
        }
      }
    ]
  )
}
