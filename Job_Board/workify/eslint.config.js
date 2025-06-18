// eslint.config.js
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import react from 'eslint-plugin-react'

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    react: {
      version: '18.3',
    },
  },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
