/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BfsBadge } from './BfsBadge';

export default {
  title: 'Atoms/BfsBadge',
  component: BfsBadge,
  argTypes: {
    'data-testid': {
      control: 'none',
    },
    children: {
      control: 'none',
    },
  },
  args: {
    label: 'Badge',
    mode: 'primary',
  },
};

const stBfsBadgeWhiteBgRedText = css`
  --bfs-badge-border-color: purple;
  --bfs-badge-bg-color: pink;
  --bfs-badge-text-color: red;
`;

export const Default = {};

export const WithLabel = {
  args: {
    label: 'Custom Label',
  },
  render: (args) => <BfsBadge {...args} />,
};

export const Modes = {
  render: () => (
    <div>
      <BfsBadge label="Default" />
      <BfsBadge mode="secondary" label="Secondary" />
      <BfsBadge mode="positive" label="Positive" />
      <BfsBadge mode="negative" label="Negative" />
    </div>
  ),
};

export const WithChildren = {
  render: (args) => (
    <div>
      <BfsBadge {...args}>
        <FontAwesomeIcon icon={faCheck} />
      </BfsBadge>
      <BfsBadge {...args}>10</BfsBadge>
      <BfsBadge mode="negative">X</BfsBadge>
      <BfsBadge {...args} mode="positive">
        <FontAwesomeIcon icon={faClock} />
      </BfsBadge>
    </div>
  ),
};

// Custom Styles
export const WhiteBgRedText = {
  args: {
    label: 'New',
  },
  render: (args) => (
    <div css={stBfsBadgeWhiteBgRedText}>
      <BfsBadge {...args} />
    </div>
  ),
};
