import { isBefore } from 'date-fns'
import { QueryFunctionContext } from 'react-query'
import {
  Account,
  Deploy,
  NetlifySite,
  Submission,
  User,
  Build
} from '../typings/netlify.d'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const getSite = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<NetlifySite> => {
  const [_key, { siteID, accessToken }] = queryKey
  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteDeploys = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Deploy>> => {
  const [_key, { siteID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}/deploys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteSubmissions = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Submission>> => {
  const [_, { siteID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}/submissions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSubmission = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; submissionID: string }]
>): Promise<Submission> => {
  const [_, { submissionID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/submissions/${submissionID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteMeta = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<any> => {
  const [_, { accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/forms`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getUser = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<User> => {
  const [_, { accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getAccounts = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Account>> => {
  const [_, { accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSites = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<NetlifySite>> => {
  const [_, { accessToken }] = queryKey
  try {
    const response = await fetch(`${BASE_URL}/sites`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const sites = (await response.json()) as Array<NetlifySite>

    return sites.sort((a, b) =>
      isBefore(
        new Date(a.published_deploy?.published_at),
        new Date(b.published_deploy?.published_at)
      )
        ? 1
        : -1
    )
  } catch (error) {
    return error
  }
}
export const getDeploy = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; buildID: string }]
>): Promise<Deploy> => {
  const [_, { accessToken, buildID }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/deploys/${buildID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getBuilds = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Build>> => {
  const [_, { accessToken, siteID }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}/builds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}
