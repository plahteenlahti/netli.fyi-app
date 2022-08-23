import crashlytics from '@react-native-firebase/crashlytics'

type User = {
  email: string
  sitesCreated: string
  createdAt: string
  id: string
}

export const setUser = async ({ email, id, sitesCreated, createdAt }: User) => {
  await Promise.all([
    crashlytics().setCrashlyticsCollectionEnabled(true),
    crashlytics().setUserId(id),
    crashlytics().setAttributes({
      sitesCreated,
      createdAt,
      email
    })
  ])
}

export const reportError = (error: unknown) => {
  if (error instanceof Error) {
    crashlytics().recordError(error)
  }
}
