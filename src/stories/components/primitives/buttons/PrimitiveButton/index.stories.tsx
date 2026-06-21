import { Meta, StoryObj } from '@storybook/react-vite'

import { PrimitiveButton } from '~/components/primitives/buttons/PrimitiveButton'

const meta: Meta<typeof PrimitiveButton> = {
  title: 'components/primitives/buttons/PrimitiveButton',
  component: PrimitiveButton,
}
export default meta

type Story = StoryObj<typeof PrimitiveButton>

export const Default: Story = {
  args: {
    children: 'PrimitiveButton',
    buttonType: 'button',
  },
}

export const Disabled: Story = {
  args: {
    children: 'PrimitiveButton',
    buttonType: 'button',
    isDisabled: true,
  },
}

export const ExternalLink: Story = {
  args: {
    children: 'PrimitiveButton',
    url: 'https://example.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
}

export const InternalLink: Story = {
  args: {
    children: 'PrimitiveButton',
    url: '/',
  },
}

export const Fallback: Story = {
  args: {
    children: 'PrimitiveButton',
  },
}
