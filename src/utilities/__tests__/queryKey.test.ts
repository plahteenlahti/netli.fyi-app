import { createQueryKey } from '../queryKey'

describe('validateToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return query keys', async () => {
    const queryKey = createQueryKey('key', { test: 100 })
    expect(queryKey).toEqual(['key', { test: 100 }])
  })
})
