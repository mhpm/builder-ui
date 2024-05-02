import React from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BfsButton } from '.';
import { modes } from './BfsButton';

describe('BfsButton component render', () => {
  it('correctly without crashing, default', () => {
    render(<BfsButton />);
    const button = screen.getByText('button');
    const icon = screen.getByTestId('icon-spinner');

    expect(button).toBeInTheDocument();
    expect(icon.parentElement).toHaveStyle('display: none');
  });

  it('correctly without crashing with tableHeader mode', () => {
    render(<BfsButton data-testid="btn" mode="tableHeader" />);
    const button = screen.getByTestId('btn');
    const icon = screen.getByTestId('icon-spinner');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('display: inline-flex');
    expect(button).not.toHaveStyle('border: solid');
    expect(icon.parentElement).toHaveStyle('display: none');
  });

  it('correctly without crashing with testid', () => {
    render(<BfsButton data-testid="btn" />);
    expect(screen.getByTestId('btn')).toBeInTheDocument();
  });

  it('correctly without crashing with children', () => {
    render(
      <BfsButton data-testid="btn">
        <span data-testid="descendant">btn with children</span>
      </BfsButton>,
    );

    const descendant = screen.getByTestId('descendant');
    expect(screen.getByTestId('btn')).toContainElement(descendant);
  });

  it('correctly without crashing, matching snapshot', () => {
    render(<BfsButton />);
    expect(screen.getByText('button')).toMatchSnapshot();
  });
});

describe('BfsButton component property', () => {
  describe('Label', () => {
    it('set to any text value', () => {
      render(<BfsButton label="save" />);
      expect(screen.getByText('save')).toHaveTextContent(/^save$/);
    });

    it('set to empty value', () => {
      render(<BfsButton data-testid="btn" label="" />);
      expect(screen.getByTestId('btn')).not.toHaveTextContent();
    });
  });

  describe('Loading', () => {
    it('set to true with default icon `spinner`', () => {
      render(<BfsButton data-testid="btn" loading />);

      expect(screen.getByTestId('btn')).toMatchSnapshot();
      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
      expect(screen.getByText('button')).toHaveStyle(`opacity: 0`);
    });

    it('set to true with icon `spinner` set', () => {
      render(<BfsButton data-testid="btn" loading icon="spinner" />);

      expect(screen.getByTestId('btn')).toMatchSnapshot();
      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
      expect(screen.getByText('button')).toHaveStyle(`opacity: 0`);
    });

    it('set to true with icon `cog` set', () => {
      render(<BfsButton data-testid="btn" loading icon="cog" />);

      expect(screen.getByTestId('btn')).toMatchSnapshot();
      expect(screen.getByTestId('icon-cog')).toBeInTheDocument();
      expect(screen.getByText('button')).toHaveStyle(`opacity: 0`);
    });

    it('set to true with icon `circlenotch` set', () => {
      render(<BfsButton data-testid="btn" loading icon="circlenotch" />);

      expect(screen.getByTestId('btn')).toMatchSnapshot();
      expect(screen.getByTestId('icon-circlenotch')).toBeInTheDocument();
      expect(screen.getByText('button')).toHaveStyle(`opacity: 0`);
    });
  });

  describe('Disable', () => {
    it('set to true', () => {
      render(<BfsButton data-testid="btn" disabled />);
      expect(screen.getByTestId('btn')).toBeDisabled();
    });

    it('set to false', () => {
      render(<BfsButton data-testid="btn" />);
      expect(screen.getByTestId('btn')).toBeEnabled();
    });
  });

  describe('Fluid', () => {
    it('set to true', () => {
      render(<BfsButton data-testid="btn" fluid />);
      expect(screen.getByTestId('btn')).toHaveStyle('width: 100%');
    });

    it('set to false', () => {
      render(<BfsButton data-testid="btn" />);
      expect(screen.getByTestId('btn')).not.toHaveStyle('width: 100%');
    });
  });

  describe('BfsButton mode styles', () => {
    Object.keys(modes).forEach((mode) => {
      it(`applies correct styles for ${mode} mode`, () => {
        render(<BfsButton mode={mode}>Test Button</BfsButton>);
        const button = screen.getByRole('button');

        expect(button).toHaveStyle(`backgroundColor: var(--rol-${mode}-bg-color)`);
      });
    });

    it(`applies correct styles for tableHeader mode`, () => {
      render(<BfsButton mode="tableHeader">Test Button</BfsButton>);
      const button = screen.getByRole('button');

      expect(button).toHaveStyle(`border: none`);
    });
  });
});

describe('BfsButton component interaction', () => {
  describe('mouse', () => {
    it('click with no callback assigned', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn">Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('click', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick}>Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('click with param', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick} param="foo">Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith('foo');
    });

    it('click with no param', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick}>Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalledWith('foo');
    });

    it('click with loading state do not run the callback', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" loading onClick={handleClick}>Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it('click with disable state do not run the callback', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" disabled onClick={handleClick}>Click Me</BfsButton>);
      await user.click(screen.getByTestId('btn'));

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('keyboard', () => {
    it('calls onClick callback when `Escape` key is pressed and escEnable prop is TRUE', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" escEnable onClick={handleClick} />);
      const btn = screen.getByTestId('btn');

      await user.tab();
      expect(btn).toHaveFocus();

      await user.keyboard('[Escape/]', btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick callback when `Escape` key is pressed and escEnable prop is FALSE', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick} />);
      const btn = screen.getByTestId('btn');

      await user.tab();
      expect(btn).toHaveFocus();

      await user.keyboard('[Escape/]', btn);
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it('calls onClick callback when `Space` key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick} />);
      const btn = screen.getByTestId('btn');

      await user.tab();
      expect(btn).toHaveFocus();

      await user.keyboard('[Space/]', btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick callback when `Enter` key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick} />);
      const btn = screen.getByTestId('btn');

      await user.tab();
      expect(btn).toHaveFocus();

      await user.keyboard('[Enter/]', btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick callback when any other key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<BfsButton data-testid="btn" onClick={handleClick} />);
      const btn = screen.getByTestId('btn');

      await user.tab();
      expect(btn).toHaveFocus();

      await user.keyboard('[a/]', btn);
      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
