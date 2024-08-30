// get rid of http:// or https:// and wwww, use first url,
export const formatUrl = (url: string) => {
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?/i
  const formattedUrl = url.replace(urlRegex, '')
  return formattedUrl
}
