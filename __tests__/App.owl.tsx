import { takeScreenshot } from 'react-native-owl'

describe('App.tsx', () => {
  it('takes a screenshot of the first screen', async () => {
    const screen = await takeScreenshot('Login')

    expect(screen).toMatchBaseline()
  })
})
