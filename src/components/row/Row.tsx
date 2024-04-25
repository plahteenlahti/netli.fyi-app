import { View, Text, TouchableOpacity, Switch, SwitchProps } from 'react-native'

type BaseProps = {
  title: string
  hideDivider?: boolean
}

type InfoProps = BaseProps & {
  value?: string | number
}

type NavigationProps = BaseProps &
  TouchableOpacityProps & {
    value?: string | number
    type: 'navigation'
  }

type ToggleProps = BaseProps &
  SwitchProps & {
    subtitle?: string
  }

type RowProps = InfoProps | NavigationProps | ToggleProps

export const Row = (props: RowProps) => {
  const renderRightContent = () => {
    switch (props.type) {
      case 'navigation':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{props.value}</Text>
            <FontAwesome5 name="chevron-right" style={{ marginLeft: 8 }} />
          </View>
        )
      default:
        return <Text>{props.value}</Text>
    }
  }

  const renderToggle = () => (
    <Switch
      {...(props as SwitchProps)}
      onChange={(props as ToggleProps).onChange}
    />
  )

  return (
    <TouchableOpacity
      disabled={props.type !== 'navigation'}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 60,
        borderBottomWidth: props.hideDivider ? 0 : 1,
        borderBottomColor: 'gray',
        paddingVertical: 8,
        paddingRight: 16,
        marginLeft: 8
      }}
      {...(props.type === 'navigation' ? props : {})}>
      <View style={{ flex: 1 }}>
        <Text>{props.title}</Text>
        {props.type === 'toggle' && (
          <Text style={{ marginTop: 8, fontSize: 12, color: 'gray' }}>
            {(props as ToggleProps).subtitle}
          </Text>
        )}
      </View>
      {props.type === 'toggle' ? renderToggle() : renderRightContent()}
    </TouchableOpacity>
  )
}
