const fs = require('fs')
module.exports = {
  on_env: async function (env) {
    if (fs.existsSync('./fastlane')) {
      const writer = fs.createWriteStream('./fastlane/.env')
      for (const key in env) {
        writer.write(`${key}=${env[key]}\n`)
      }
      writer.close()
    }
  }
}
