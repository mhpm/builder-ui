/* eslint-disable react/jsx-props-no-spreading */
import { action } from '@storybook/addon-actions';

import { BfsButton } from './BfsButton';

export default {
  title: 'Atoms/BfsButton',
  component: BfsButton,
  parameters: {
    componentSubtitle: 'Reusable General Button for BFS projects',
  },
  argTypes: {
    'data-testid': {
      control: 'none',
    },
    icon: {
      control: {
        type: 'select',
        options: [
          'spinner',
          'cog',
          'circle',
        ],
      },
    },
    onClick: {
      control: 'none',
    },
    param: {
      control: 'none',
    },
  },
  args: {
    label: 'Button',
    mode: 'primary',
    disabled: false,
    fluid: false,
    loading: false,
    icon: 'spinner',
    onClick: action('Button Clicked'),
    escEnable: false,
  },
  excludeStories: /.*Data$/,
};

export const actionsData = {
  btn1Handle: action('onBtn1'),
  btn2Handle: action('onBtn2'),
  btn3Handle: action('onBtn3'),
  btn4Handle: action('onBtn4'),
  btn5Handle: action('onBtn5'),
  btn6Handle: action('onBtn6'),
  btn7Handle: action('onBtn7'),
  btn8Handle: action('onBtn8'),
};

export const Default = {};

export const Children = {
  render: (args) => (
    <div>
      <BfsButton {...args} onClick={actionsData.btn1Handle}>
        Loren ipsum
      </BfsButton>

      <BfsButton {...args} onClick={actionsData.btn2Handle}>
        <h1>Howdy y&apos;all!</h1>
      </BfsButton>

      <BfsButton {...args} onClick={actionsData.btn3Handle}>
        <h3>Howdy y&apos;all!</h3>
      </BfsButton>
    </div>
  ),
};

export const Loading = {
  args: {
    loading: true,
  },
  render: (args) => (
    <div>
      <BfsButton {...args} onClick={actionsData.btn1Handle} />
      <BfsButton
        {...args}
        mode="secondary"
        onClick={actionsData.btn2Handle}
      />
      <BfsButton
        {...args}
        mode="positive"
        onClick={actionsData.btn3Handle}
      />
      <BfsButton
        {...args}
        mode="negative"
        onClick={actionsData.btn4Handle}
      />
      <BfsButton
        {...args}
        mode="negative"
        onClick={actionsData.btn4Handle}
        label="Button with different size"
      />
      <BfsButton
        {...args}
        mode="negative"
        onClick={actionsData.btn4Handle}
      >
        <h2>Button</h2>
      </BfsButton>
    </div>
  ),
};

export const Fluid = {
  args: {
    fluid: true,
  },
  render: (args) => <BfsButton {...args} />,
};

export const FluidMany = {
  args: {
    fluid: true,
  },
  render: (args) => (
    <div>
      <h3>
        The parent container elment should have
        <em>&apos;display: flex&apos;</em>
      </h3>
      <div style={{ display: 'flex', border: '1px solid #ee00ee' }}>
        <BfsButton
          {...args}
          mode="negative"
          label="delete"
          onClick={actionsData.btn1Handle}
        />
        <BfsButton
          {...args}
          mode="secondary"
          label="cancel"
          onClick={actionsData.btn2Handle}
        />
      </div>
    </div>
  ),
};

export const GhostMode = {
  render: (args) => (
    <div>
      <BfsButton {...args} mode="primaryGhost" />
      <BfsButton {...args} mode="secondaryGhost" />
      <BfsButton {...args} mode="negativeGhost" />
      <BfsButton {...args} mode="positiveGhost" />
    </div>
  ),
};

export const tableHeader = {
  render: (args) => (
    <div>
      <BfsButton {...args} mode="tableHeader" label="Header" />
      <BfsButton {...args} mode="tableHeader" label="Header" />
      <BfsButton {...args} mode="tableHeader" label="Header" />
      <BfsButton {...args} mode="tableHeader" label="Header" />
    </div>
  ),
};

export const Gallery = {
  args: {
    param: 'params',
  },
  render: (args) => (
    <div>
      <div>
        <BfsButton
          {...args}
          mode="primary"
          label="primary"
          onClick={actionsData.btn1Handle}
        />
        <BfsButton
          {...args}
          mode="secondary"
          label="secondary"
          onClick={actionsData.btn2Handle}
        />
        <BfsButton
          {...args}
          mode="negative"
          label="negative"
          onClick={actionsData.btn3Handle}
        />
        <BfsButton
          {...args}
          mode="positive"
          label="positive"
          onClick={actionsData.btn4Handle}
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primary"
          label="primary"
          onClick={actionsData.btn1Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="secondary"
          label="secondary"
          onClick={actionsData.btn2Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="negative"
          label="negative"
          onClick={actionsData.btn3Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="positive"
          label="positive"
          onClick={actionsData.btn4Handle}
          disabled
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primary"
          label="primary"
          onClick={actionsData.btn1Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="secondary"
          label="secondary"
          onClick={actionsData.btn2Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="negative"
          label="negative"
          onClick={actionsData.btn3Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="positive"
          label="positive"
          onClick={actionsData.btn4Handle}
          loading
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primary"
          label="primary"
          onClick={actionsData.btn1Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="secondary"
          label="secondary"
          onClick={actionsData.btn2Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="negative"
          label="negative"
          onClick={actionsData.btn3Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="positive"
          label="positive"
          onClick={actionsData.btn4Handle}
          loading
          disabled
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primaryGhost"
          label="primary ghost"
          onClick={actionsData.btn5Handle}
        />
        <BfsButton
          {...args}
          mode="secondaryGhost"
          label="secondary ghost"
          onClick={actionsData.btn6Handle}
        />
        <BfsButton
          {...args}
          mode="negativeGhost"
          label="negative ghost"
          onClick={actionsData.btn7Handle}
        />
        <BfsButton
          {...args}
          mode="positiveGhost"
          label="positive ghost"
          onClick={actionsData.btn8Handle}
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primaryGhost"
          label="primary ghost"
          onClick={actionsData.btn1Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="secondaryGhost"
          label="secondary ghost"
          onClick={actionsData.btn1Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="negativeGhost"
          label="negative ghost"
          onClick={actionsData.btn1Handle}
          disabled
        />
        <BfsButton
          {...args}
          mode="positiveGhost"
          label="positive ghost"
          onClick={actionsData.btn1Handle}
          disabled
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primaryGhost"
          label="primary ghost"
          onClick={actionsData.btn5Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="secondaryGhost"
          label="secondary ghost"
          onClick={actionsData.btn6Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="negativeGhost"
          label="negative ghost"
          onClick={actionsData.btn7Handle}
          loading
        />
        <BfsButton
          {...args}
          mode="positiveGhost"
          label="positive ghost"
          onClick={actionsData.btn8Handle}
          loading
        />
      </div>
      <div>
        <BfsButton
          {...args}
          mode="primaryGhost"
          label="primary ghost"
          onClick={actionsData.btn1Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="secondaryGhost"
          label="secondary ghost"
          onClick={actionsData.btn1Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="negativeGhost"
          label="negative ghost"
          onClick={actionsData.btn1Handle}
          loading
          disabled
        />
        <BfsButton
          {...args}
          mode="positiveGhost"
          label="positive ghost"
          onClick={actionsData.btn1Handle}
          loading
          disabled
        />
      </div>
    </div>
  ),
};

export const WithParam = {
  args: {
    label: 'With Params',
    param: {
      key1: 'param 1',
      key2: [],
    },
  },
  render: (args) => <BfsButton {...args} />,
};
