module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.js', '*.jsx'],
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.less',
      options: {
        parser: 'less'
      }
    }
  ]
};
