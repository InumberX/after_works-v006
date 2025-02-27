import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginNext from '@next/eslint-plugin-next'
import { fixupPluginRules } from '@eslint/compat'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dir,
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
      },
    },
  },
  // React
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    plugins: {
      react: pluginReact,
      'react-hooks': fixupPluginRules(pluginReactHooks),
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Custom rules
  {
    rules: {
      'react/jsx-no-target-blank': 'off',
    },
  },
  {
    ignores: ['node_modules', '.next', 'storybook-build', 'public', '.env'],
  },
)
