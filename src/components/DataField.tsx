import React, { FC } from 'react'
import styled from 'styled-components/native'
import { words } from 'lodash'
import { Linking } from 'react-native'

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
        <Row>
          <Key>{words(title).join(' ')}</Key>
          <Value adjustsFontSizeToFit>{fiedValue}</Value>
        </Row>
      )

    case 'string':
      return (
        <Row>
          <Key>{words(title).join(' ')}</Key>
          <Value adjustsFontSizeToFit>{fiedValue}</Value>
        </Row>
      )
    case 'url':
      return (
        <Row>
          <Key>{words(title).join(' ')}</Key>
          <Link onPress={handleLinkPress}>
            <Value adjustsFontSizeToFit>{fiedValue}</Value>
          </Link>
        </Row>
      )
    default:
      return null
  }
}

const Key = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.primaryTextColor};
`
const Value = styled.Text`
  text-align: right;
  flex: 1;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Link = styled.TouchableOpacity`
  flex: 1;
`

const Row = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`
