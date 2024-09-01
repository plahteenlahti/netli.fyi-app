import { validateToken } from '../token'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true
  })
)

describe('validateToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return true when the response is ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: true
    })

    const result = await validateToken('valid-token')
    expect(fetch).toHaveBeenCalledWith('https://api.netlify.com/api/v1/user', {
      headers: {
        Authorization: 'Bearer valid-token'
      }
    })
    expect(result).toBe(true)
  })

  it('should return false when the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    })

    const result = await validateToken('invalid-token')
    expect(fetch).toHaveBeenCalledWith('https://api.netlify.com/api/v1/user', {
      headers: {
        Authorization: 'Bearer invalid-token'
      }
    })
    expect(result).toBe(false)
  })

  it('should return false if fetch throws an error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const result = await validateToken('token-causing-error')
    expect(fetch).toHaveBeenCalledWith('https://api.netlify.com/api/v1/user', {
      headers: {
        Authorization: 'Bearer token-causing-error'
      }
    })
    expect(result).toBe(false)
  })
})
