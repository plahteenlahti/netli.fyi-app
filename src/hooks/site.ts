import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NetlifySite } from '@typings/netlify'
import { BASE_URL } from '@utilities/constants'
import { createQueryKey } from '@utilities/queryKey'
import { useToken } from './useToken'
import { useGetToken } from './keychain'

export const useSites = () => {
  const token = useGetToken()

  return useQuery<Array<NetlifySite>, Error>({
    queryKey: createQueryKey('sites', { accessToken: token.data }),
    queryFn: async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/sites?filter=all&sort_by=updated_at`,
          {
            headers: {
              Authorization: `Bearer ${token.data}`
            }
          }
        )

        return response.json()
      } catch (error) {
        console.log('error', error)
        return error
      }
    }
  })
}

export const useSite = (siteID: string) => {
  const accessToken = useToken()
  const queryKey = createQueryKey('site', { siteID, accessToken })

  return useQuery<NetlifySite, Error>({
    queryKey,
    queryFn: async () => {
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
  })
}

export const useBuildSettings = (siteID: string) => {
  const accessToken = useToken()
  const queryKey = createQueryKey('site', { siteID, accessToken })

  return useQuery<NetlifySite, Error, NetlifySite['build_settings']>({
    queryKey,
    queryFn: async () => {
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
    },
    select: data => data?.build_settings
  })
}

export const useUpdateBuildSettings = (siteID: string) => {
  const accessToken = useToken()
  const queryClient = useQueryClient()
  const queryKey = createQueryKey('site', { siteID, accessToken })

  return useMutation<NetlifySite, Error, NetlifySite['build_settings']>({
    mutationFn: async buildSettings => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${siteID}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            build_settings: {
              cmd: buildSettings?.cmd,
              base: buildSettings?.base,
              package_path: buildSettings?.package_path,
              functions_dir: buildSettings?.functions_dir
            }
          })
        })
        return response.json()
      } catch (error) {
        return error
      }
    },
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData(queryKey)
      queryClient.setQueryData<
        NetlifySite,
        readonly unknown[],
        NetlifySite['build_settings']
      >(queryKey, oldData => ({
        ...oldData,
        ...newData
      }))
      return { previousData }
    },
    onError: (_err, _newData, context) => {
      // TODO add zod validation
      const { previousData } = context as { previousData: NetlifySite }

      queryClient.setQueryData<
        NetlifySite,
        readonly unknown[],
        NetlifySite['build_settings']
      >(queryKey, previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['site', { siteID, accessToken }]
      })
    }
  })
}
