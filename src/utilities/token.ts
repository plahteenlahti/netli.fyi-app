export const validateToken = async (token: string) => {
  try {
    const response = await fetch('https://api.netlify.com/api/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}
