import { FC } from 'react'
import { useBuildSettings, useUpdateBuildSettings } from '../hooks/site'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { InfoRow } from './row/InfoRow'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { Typography } from './layout/Typography'

type Props = {
  siteID: string
}

export const BuildSettings: FC<Props> = ({ siteID }) => {
  const buildSettings = useBuildSettings(siteID)
  const updateBuildSettings = useUpdateBuildSettings(siteID)

  const form = useForm({
    defaultValues: {
      cmd: buildSettings.data?.cmd,
      base: buildSettings.data?.base,
      package_path: buildSettings.data?.package_path,
      functions_dir: buildSettings.data?.functions_dir
    },
    values: buildSettings.data
  })

  const save = form.handleSubmit(data => {
    updateBuildSettings.mutate({
      ...data
    })
  })

  return (
    <>
      <CardTitle icon="info-circle" title="Build settings" />
      <Card>
        {form.formState.isDirty && (
          <View className="flex-row-reverse gap-1">
            <TouchableOpacity onPress={save}>
              <View className="flex items-center justify-center bg-blue-400 rounded-md w-12">
                <Typography className="text-sm font-bold text-accent">
                  Save
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Controller
          control={form.control}
          render={({ field }) => (
            <InfoRow
              title="Command"
              onChangeText={field.onChange}
              value={field.value}
              editHint="The command Netlify runs to build your site."
            />
          )}
          name="cmd"
        />
        <InfoRow
          title="Base directory"
          value={buildSettings.data?.base ?? '/'}
          editHint="The directory where Netlify installs dependencies and runs your build command."
        />
        <InfoRow
          title="Package directory"
          value={buildSettings.data?.package_path ?? 'Not set'}
          editHint="For monorepos, the directory that contains your site files, including the netlify.toml."
        />
        <InfoRow title="Publish directory" value={buildSettings.data?.dir} />
        <InfoRow
          hideDivider
          title="Functions directory"
          editHint="The directory where Netlify can find your compiled functions to deploy them. Defaults to netlify/functions if not set."
          value={buildSettings.data?.functions_dir ?? 'netlify/functions'}
        />
      </Card>
    </>
  )
}
