/* eslint-disable react/jsx-props-no-spreading */
import { action } from '@storybook/addon-actions';
import { BfsDropdown } from '.';

export default {
  title: 'Atoms/BfsDropdown',
  component: BfsDropdown,
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: 'white', margin: '10px', padding: 20, height: '30vh',
        }}
      >
        {story()}
      </div>
    ),
  ],
  argTypes: {
    'data-testid': {
      control: 'none'
    }
  },
  args: {
    name: 'name',
    id: 'id',
    dropdownOptions: [],
    isSearchable: true,
    isFluid: false,
    clearable: true,
    selectedValue: null,
    isSelectOnBlur: true,
    disabled: false,
    onChange: action('onChange'),
  },
  parameters: {
    componentSubtitle: 'Reusable General Dropdown for BFS projects',
  },
  excludeStories: /.*Data$/,
};

const countiesData = ['Canada', 'United States', 'Mexico', 'Spain', 'Argentina'];

const dummyData = [
  ...countiesData.map((country) => (
    {
      key: country,
      text: country,
      value: country,
    }
  )),
];

const dummyDataWithDescription = [
  { ...dummyData[0], description: 'CA' },
  { ...dummyData[1], description: 'US' },
  { ...dummyData[2], description: 'MX' },
  { ...dummyData[3], description: 'ES' },
  { ...dummyData[4], description: 'AR' },
];

export const Default = {};

export const WithOptions = {
  args: {
    dropdownOptions: dummyData,
  },
  render: (args) => (
    <BfsDropdown {...args} />
  ),
};

export const Searchable = {
  args: {
    isSearchable: true,
    dropdownOptions: dummyData,
  },
  render: (args) => (
    <BfsDropdown {...args} />
  ),
};

export const Fluid = {
  args: {
    isFluid: true,
    dropdownOptions: dummyData,
  },
  render: (args) => (
    <BfsDropdown {...args} />
  ),
};

export const WithOptionDescription = {
  args: {
    dropdownOptions: dummyDataWithDescription,
  },
  render: (args) => (
    <div>
      <BfsDropdown {...args} />
    </div>
  ),
};

export const WithSelectedValue = {
  args: {
    selectedValue: 'Argentina',
    dropdownOptions: dummyDataWithDescription,
  },
  render: (args) => (
    <div>
      <BfsDropdown {...args} />
    </div>
  ),
};

export const WithPlaceholder = {
  args: {
    placeholder: 'Select a country',
    dropdownOptions: dummyDataWithDescription,
  },
  render: (args) => (
    <div>
      <BfsDropdown {...args} />
    </div>
  ),
};

export const disabled = {
  args: {
    selectedValue: 'Argentina',
    disabled: true,
    dropdownOptions: dummyDataWithDescription,
  },
  render: (args) => (
    <div>
      <BfsDropdown {...args} />
    </div>
  ),
};
