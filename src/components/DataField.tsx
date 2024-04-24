import { FC } from 'react'
import styled from 'styled-components/native'
import words from 'lodash/words'
import { Linking, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'

type Props = {
  title: string
  value: unknown
}

type FieldPresentation = {
  value: string
  type: 'string' | 'url' | 'boolean' | null
}

const getValue = (v: unknown): FieldPresentation => {
  switch (typeof v) {
    case 'boolean':
      return { type: 'boolean', value: v ? 'Yes' : 'No' }
    case 'number':
      return { type: 'string', value: `${v}` }
    case 'string':
      if (v.includes('https')) {
        return { type: 'url', value: v.replace('https://', '') }
      }
      if (v.includes('http')) {
        return { type: 'url', value: v.replace('http://', '') }
      }
      return { type: 'string', value: v }
    default:
      return { type: null, value: '' }
  }
}

export const DataField: FC<Props> = ({ title, value }) => {
  const { value: fiedValue, type } = getValue(value)

  const handleLinkPress = () => {
    if (type === 'url') {
      Linking.openURL(value as string)
    }
  }

  switch (type) {
    case 'boolean':
      return (
        <View className="flex-row justify-between p-2">
          <Key>{words(title).join(' ')}</Key>
          <Value adjustsFontSizeToFit>{fiedValue}</Value>
        </View>
      )

    case 'string':
      return (
        <View className="flex-row justify-between p-2">
          <Text className="text-xs text-left">{words(title).join(' ')}</Text>
          <Value adjustsFontSizeToFit>{fiedValue}</Value>
        </View>
      )
    case 'url':
      return (
        <View className="flex-row justify-between p-2">
          <Key>{words(title).join(' ')}</Key>
          <TouchableOpacity className="flex-1" onPress={handleLinkPress}>
            <Text className="text-xs text-right">{fiedValue}</Text>
          </TouchableOpacity>
        </View>
      )
    default:
      return null
  }
}

const Key = styled(Text)`
  flex: 1;
  color: ${({ theme }) => theme.primaryTextColor};
`
const Value = styled(Text)`
  text-align: right;
  flex: 1;
  color: ${({ theme }) => theme.primaryTextColor};
`
