/* eslint-disable react/jsx-props-no-spreading */
import { BfsIcon, icons } from './BfsIcon';

export default {
  title: 'Atoms/BfsIcon',
  component: BfsIcon,
  parameters: {
    componentSubtitle: 'Reusable Icons for BFS projects',
  },
  argTypes: {
    'data-testid': {
      control: 'none',
    },
    icon: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
  },
  args: {
    'data-testid': '',
    icon: 'spinner',
    spin: false,
    size: '16',
  },
};

export const Default = {
  render: (args) => (
    <BfsIcon {...args} />
  ),
};

export const Spin = {
  args: {
    icon: 'spinner',
    spin: true,
  },
  render: (args) => <BfsIcon {...args} />,
};

export const Gallery = {
  args: {
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 10 }}>
      {Object.keys(icons).map((icon) => (
        <BfsIcon key={icon} {...args} icon={icon} />
      ))}
    </div>
  ),
};
