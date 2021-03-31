import styled, { css } from 'styled-components/native'

// Large Title	Regular	34	41
// Title 1	Regular	28	34
// Title 2	Regular	22	28
// Title 3	Regular	20	25
// Headline	Semi-Bold	17	22
// Body	Regular	17	22
// Callout	Regular	16	21
// Subhead	Regular	15	20
// Footnote	Regular	13	18
// Caption 1	Regular	12	16
// Caption 2	Regular	11	13
const largeTitle = css`
  font-size: 34px;
  line-height: 41px;
`

const title1 = css`
  font-size: 28px;
  line-height: 34px;
`

const title2 = css`
  font-size: 28px;
  line-height: 22px;
`
const title3 = css`
  font-size: 20px;
  line-height: 25px;
`

const headline = css`
  font-size: 17px;
  line-height: 22px;
  font-weight: bold;
`

const body = css`
  font-size: 17px;
  line-height: 22px;
`

const callout = css`
  font-size: 16px;
  line-height: 21px;
`
const subhead = css`
  font-size: 15px;
  line-height: 20px;
`

const footnote = css`
  font-size: 13px;
  line-height: 18px;
`

const caption1 = css`
  font-size: 12px;
  line-height: 16px;
`

const caption2 = css`
  font-size: 11px;
  line-height: 13px;
`

type Props = {
  type:
    | 'Large Title'
    | 'Title 1'
    | 'Title 2'
    | 'Title 3'
    | 'Headline'
    | 'Body'
    | 'Callout'
    | 'Subhead'
    | 'Footnote'
    | 'Caption 1'
    | 'Caption 2'
}

export const Text = styled.Text<Props>`
  color: ${({ theme }) => theme.primaryTextColor};
  ${({ type }) => {
    switch (type) {
      case 'Large Title':
        return largeTitle
      case 'Title 1':
        return title1
      case 'Title 2':
        return title2
      case 'Title 3':
        return title3
      case 'Headline':
        return headline
      case 'Body':
        return body
      case 'Callout':
        return callout
      case 'Footnote':
        return footnote
      case 'Subhead':
        return subhead
      case 'Caption 1':
        return caption1
      case 'Caption 2':
        return caption2
      default:
        return caption2
    }
  }}
`
