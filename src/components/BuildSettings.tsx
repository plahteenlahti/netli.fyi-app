import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { useBuildSettings, useUpdateBuildSettings } from '../hooks/site'
import { Card } from './Card'
import { CardTitle } from './CardTitle'
import { Typography } from './layout/Typography'
import { FormRow } from './row/FormRow'
import { InfoRow } from './row/InfoRow'

type Props = {
  siteID: string
}

type Form = {
  cmd?: string | null
  base?: string | null
  package_path?: string | null
  functions_dir?: string | null
}

export const BuildSettings: FC<Props> = ({ siteID }) => {
  const buildSettings = useBuildSettings(siteID)
  const updateBuildSettings = useUpdateBuildSettings(siteID)

  const form = useForm<Form>({
    values: {
      cmd: buildSettings.data?.cmd,
      base: buildSettings.data?.base,
      package_path: buildSettings.data?.package_path,
      functions_dir: buildSettings.data?.functions_dir
    }
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

        <FormRow<Form>
          name="cmd"
          selectTextOnFocus
          title="Command"
          control={form.control}
          autoCapitalize="none"
          autoCorrect={false}
          editHint="The command Netlify runs to build your site."
        />
        <FormRow<Form>
          name="base"
          selectTextOnFocus
          title="Base directory"
          control={form.control}
          autoCapitalize="none"
          autoCorrect={false}
          editHint="The directory where Netlify installs dependencies and runs your build command."
        />
        <FormRow<Form>
          name="package_path"
          selectTextOnFocus
          title="Package directory"
          control={form.control}
          autoCapitalize="none"
          autoCorrect={false}
          editHint="For monorepos, the directory that contains your site files, including the netlify.toml."
        />
        <InfoRow title="Publish directory" value={buildSettings.data?.dir} />
        <FormRow<Form>
          hideDivider
          name="functions_dir"
          selectTextOnFocus
          title="Functions directory"
          control={form.control}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="netlify/functions"
          editHint="The directory where Netlify can find your compiled functions to deploy them. Defaults to netlify/functions if not set."
        />
      </Card>
    </>
  )
}
