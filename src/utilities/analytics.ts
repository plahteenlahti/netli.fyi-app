import analytics from '@react-native-firebase/analytics'

export type Event = 'open from quick action' | 'open from siri'

export const track = async (event: Event) => {
  await analytics().logEvent(event, {})
}
