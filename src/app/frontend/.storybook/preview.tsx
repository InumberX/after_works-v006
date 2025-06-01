import React from 'react'
import { Preview } from '@storybook/react'
import '@/styles/common.css'

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      return <Story />
    },
  ],
}

export default preview
