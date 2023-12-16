import { Media } from '@/lib/types'
import type { Meta, StoryObj } from '@storybook/react'
import { flatten, times } from 'lodash/fp'
import MediaList from './MediaList'

const mediaMock: Media[] = require('./medialist-mock.json')

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/MediaList',
  component: MediaList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MediaList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    media: mediaMock,
  },
}

export const ShortList: Story = {
  args: {
    media: mediaMock.slice(0, 3),
  },
}

export const MegaLongList: Story = {
  args: {
    media: flatten(times(() => mediaMock, 10)),
  },
}
