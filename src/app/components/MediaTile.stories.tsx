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
    description:
      'A coming-of-age story about an Adélie penguin named Steve who joins millions of fellow males in the icy Antarctic spring on a quest to build a suitable nest, find a life partner and start a family.',
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

export const TVSeries: Story = {
  args: {
    id: '184931',
    title: 'Arrested Development',
    description:
      'Michael Bluth finds himself forced to stay in Orange County and run the family real estate business after his father, George Bluth Sr., is sent to prison for committing white-collar crime. He tries to juggle the wants and needs of his spoiled and eccentric family while being a good role model for his teenage son, George Michael.',
    imageUrl: 'http://tmsimg.fancybits.co/assets/p184931_b_h6_ac.jpg',
    isVertical: false,
  },
}
