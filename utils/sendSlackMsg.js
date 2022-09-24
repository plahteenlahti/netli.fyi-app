/**
 * This script can be used to send Slack notification
 * Made own script since https://github.com/marketplace/actions/slack-notify doesn't support Mac.
 *
 * Example usage:
 *  node sendSlackMsg.js --author "Valtteri" --commitMsg "Adds slack notifications" --branch "dev" --title 'Title for slack msg' --url $secrets.SLACK_WEBHOOK --channel mobile-builds
 *
 *
 */

var myArgs = process.argv.slice(2)

const { exec } = require('child_process')

const getArg = prefix => {
  const index = myArgs.findIndex(arg => arg === prefix)

  if (index === -1) {
    return
  } else {
    return myArgs[index + 1]
  }
}

const author = getArg('--author')
const commitMsg = getArg('--commitMsg')
const branch = getArg('--branch')
const title = getArg('--title')
const SLACK_URL = getArg('--url')
const channel = getArg('--channel')
const username = getArg('--username') || 'Mr. Bot'
const iconUrl = getArg('--iconUrl') || 'https://i.ibb.co/RYxqDWP/bender.png'
const githubActionUrl = getArg('--actionUrl')
const githubCommitUrl = getArg('--commitUrl')
const OS = getArg('--OS')

const date = new Date()
const formattedDate =
  'UTC: ' +
  date.getUTCDay() +
  '.' +
  date.getUTCMonth() +
  '.' +
  date.getUTCFullYear() +
  ' ' +
  date.getUTCHours() +
  ':' +
  date.getUTCMinutes()

const body = {
  fields: [],
  channel,
  username,
  icon_url: iconUrl,
  pretext: title
}

if (formattedDate) {
  body.fields.push({ title: 'Build Date', value: formattedDate, short: true })
}

if (branch) {
  body.fields.push({ title: 'Git Branch', value: branch, short: true })
}

if (commitMsg) {
  body.fields.push({ title: 'Git Commit', value: commitMsg, short: true })
}

if (author) {
  body.fields.push({ title: 'Git Author', value: author, short: true })
}

if (OS) {
  body.fields.push({ title: 'OS', value: OS, short: true })
}

if (githubActionUrl) {
  body.fields.push({
    title: 'Action link',
    value: githubActionUrl
  })
}

if (githubCommitUrl) {
  body.fields.push({
    title: 'Commit link',
    value: githubCommitUrl
  })
}

exec(
  "curl -X POST -H 'Content-type:application/json' --data '" +
    JSON.stringify(body) +
    "' " +
    SLACK_URL,
  err => {
    if (err) {
      return 1
    } else {
      return 0
    }
  }
)
