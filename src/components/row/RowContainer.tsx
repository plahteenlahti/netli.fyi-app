import { StyleSheet } from 'react-native'
import styled, { css } from 'styled-components/native'

export type RowContainerProps = {
  hideDivider?: boolean
}

export const RowContainer = styled.View<RowContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ hideDivider, theme }) =>
    hideDivider
      ? css``
      : css`
          border-bottom-width: ${StyleSheet.hairlineWidth}px;
          border-bottom-color: ${theme.borderColor};
        `}

  padding: 16px 0px;
`
