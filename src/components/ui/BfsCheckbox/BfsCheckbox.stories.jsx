/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import {BfsCheckbox} from '.';

export default {
  title: 'Atoms/BfsCheckbox',
  component: BfsCheckbox,
  argTypes: {
    'data-testid': {
      control: 'none',
    },
  },
  args: {
    checked: false,
    name: 'checkbox1',
    label: 'label',
    asToggle: false,
    onChange: action('changed'),
    disabled: false,
    param: { param1: 'param test' },
    tabIndex: '1',
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = {};

export const CheckedCheckbox = {
  args: {
    checked: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const WithLabel = {
  args: {
    checked: true,
    label: 'label',
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const DisabledCheckbox = {
  args: {
    disabled: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const DisabledCheckedCheckbox = {
  args: {
    disbled: true,
    checked: true,
  },
  render: () => <BfsCheckbox />,
};

export const AsToggleUncheckedCheckbox = {
  args: {
    asToggle: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const AsToggleCheckedCheckbox = {
  args: {
    checked: true,
    asToggle: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const AsToggleWithLabel = {
  args: {
    checked: true,
    asToggle: true,
    label: 'toggle with label',
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const AsToggleDisabledCheckbox = {
  args: {
    label: 'disabled',
    disabled: true,
    asToggle: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const AsToggleCheckedDisabledCheckbox = {
  args: {
    checked: true,
    label: 'disabled',
    asToggle: true,
    disabled: true,
  },
  render: (args) => <BfsCheckbox {...args} />,
};

export const CheckboxGallery = {
  render: (args) => (
    <div style={{ display: 'flex' }}>
      <BfsCheckbox {...args} checked={false} />
      <BfsCheckbox {...args} name="checkbox 2" checked />
      <BfsCheckbox {...args} name="checkbox 3" disabled />
      <BfsCheckbox {...args} name="checkbox 4" checked disabled />
      <BfsCheckbox {...args} name="checkbox 5" checked asToggle />
      <BfsCheckbox {...args} name="checkbox 6" asToggle checked />
      <BfsCheckbox {...args} name="checkbox 7" asToggle disabled />
      <BfsCheckbox {...args} name="checkbox 8" asToggle checked disabled />
    </div>
  ),
};
