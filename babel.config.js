module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx'
        ],
        alias: {
          '@components': './src/components',
          '@utilities': './src/utilities',
          '@views': './src/views',
          '@assets': './src/assets',
          '@store': './src/store',
          '@navigators': './src/navigators',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@typings': './src/typings'
        }
      }
    ],
    'nativewind/babel',
    'react-native-reanimated/plugin'
  ]
}
