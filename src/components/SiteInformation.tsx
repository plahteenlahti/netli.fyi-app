import { Linking } from 'react-native'
import useTimeAgo from '@hooks/time/useTimeFrom'
import { NetlifySite } from '@typings/netlify.d'
import { localizedRelativeFormat } from '../utilities/time'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { InfoRow } from './row/InfoRow'
import { NavigationRow } from './row/NavigationRow'

type Props = {
  site: NetlifySite | undefined
  name?: string
  loading: boolean
}

export const SiteInformation = ({ site, name, loading }: Props) => {
  const openSite = () => {
    Linking.openURL(`${site?.url}`)
  }

  const openManage = () => {
    Linking.openURL(`${site?.published_deploy?.admin_url}`)
  }
  const createdAt = site?.created_at
    ? localizedRelativeFormat(new Date(`${site?.created_at}`), new Date())
    : ''

  const updatedAt = useTimeAgo(new Date(site?.updated_at ?? new Date()))

  return (
    <>
      <CardTitle icon="info-circle" title="Details" />
      <Card>
        <NavigationRow
          type="navigation"
          title="Domain"
          value={name}
          onPress={openSite}
        />
        <InfoRow title="Created" value={createdAt} loading={loading} />
        <InfoRow title="Updated" value={updatedAt} loading={loading} />
        <NavigationRow
          loading={loading}
          title="Published Deploy"
          value={site?.published_deploy?.name}
        />
        <NavigationRow
          loading={loading}
          type="navigation"
          hideDivider
          title="Manage site"
          value="netlify.com"
          onPress={openManage}
        />
      </Card>
    </>
  )
}
