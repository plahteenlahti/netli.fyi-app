import { takeScreenshot } from 'react-native-owl'

jest.setTimeout(3000)

describe('App.tsx', () => {
  it('takes a screenshot of the first screen', async () => {
    const screen = await takeScreenshot('Login')

    expect(screen).toMatchBaseline()
  })
})
