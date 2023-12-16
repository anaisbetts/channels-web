import type { Meta, StoryObj } from '@storybook/react'
import { MediaTile } from './MediaList'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/MediaTile',
  component: MediaTile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    id: '1',
    imageUrl:
      'https://image.tmdb.org/t/p/w780//eMSuKJ2e5VgYFr4SwOTLnnl5L15.jpg',
    title: 'Penguins',
    description: "It's a penguin movie!",
    isVertical: true,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MediaTile>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
}
