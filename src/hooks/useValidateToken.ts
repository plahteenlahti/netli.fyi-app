import { useState } from 'react'
import { BASE_URL } from '@utilities/constants'
import { ensureMinLoadingTime } from '@utilities/time'

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Hook to validate token with loading state management.
 *
 * States: 'idle' | 'loading' | 'success' | 'error'
 * @returns current state and function to validate a token
 */
export const useValidateToken = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )

  const validate = async (token: string): Promise<boolean> => {
    setState('loading')

    try {
      const isValid = await ensureMinLoadingTime(validateToken(token), 2000)

      if (isValid) {
        setState('success')
        return true
      } else {
        setState('error')
        return false
      }
    } catch (error) {
      setState('error')
      return false
    }
  }

  const reset = () => {
    if (state !== 'loading') {
      setState('idle')
    }
  }

  return { state, validate, reset }
}
