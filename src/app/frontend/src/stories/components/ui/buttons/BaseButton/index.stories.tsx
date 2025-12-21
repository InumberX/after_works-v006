import { Meta, StoryObj } from '@storybook/react-vite'

import { BaseButton } from '@/components/ui/buttons/BaseButton'

const meta: Meta<typeof BaseButton> = {
  title: 'components/ui/buttons/BaseButton',
  component: BaseButton,
}
export default meta

type Story = StoryObj<typeof BaseButton>

export const Default: Story = {
  args: {
    text: 'BaseButton',
  },
}

export const ArrowRight: Story = {
  args: {
    text: 'BaseButton',
    isRightArrow: true,
  },
}
