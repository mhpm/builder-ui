import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BfsCheckbox } from '.';

describe('BfsCheckbox render correctly', () => {
  // Test rendering with minimal props
  it('default', () => {
    render(<BfsCheckbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('data-testid', () => { 
    render(<BfsCheckbox data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });
});

describe('BfsCheckbox component property', () => { 
  it('Set label', () => {
    const label = 'Test Label';
    render(<BfsCheckbox label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('Set empty label', () => {
    render(<BfsCheckbox data-testid="checkbox" label="" />);
    expect(screen.getByTestId('checkbox')).toHaveTextContent('');
  });

  it('Set Checked', () => {
    render(<BfsCheckbox data-testid="checkbox" checked />);
    const checkbox = screen.getByTestId('checkbox');
    
    expect(checkbox).toBeChecked();
    
  });

  it('Set Checked false', () => {
    render(<BfsCheckbox data-testid="checkbox" checked={false} />);
    const checkbox = screen.getByTestId('checkbox');
    
    expect(checkbox).not.toBeChecked();
    
  });

  it('Set diabled true', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<BfsCheckbox data-testid="check" onChange={handleChange} disabled />);
    const checkbox = screen.getByTestId('check');
    await user.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Set diabled false', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<BfsCheckbox data-testid="check" onChange={handleChange} disabled={false} />);
    const checkbox = screen.getByTestId('check');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('Set Toggle true', () => {
    render(<BfsCheckbox asToggle name="toggle-checkbox" />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toHaveClass('toggle');
  });

  it('Set Toggle false', () => {
    render(<BfsCheckbox asToggle={false} name="toggle-checkbox" />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toHaveClass('toggle');
  });
 })

describe('BfsCheckbox component interactions', () => { 
  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<BfsCheckbox onChange={handleChange} data-testid="check" />);
    const checkbox = screen.getByTestId('check');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles checked state on pressing Space', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<BfsCheckbox onChange={handleChange} tabIndex="0" />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();

    await user.keyboard('[Space]');
    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles checked state on pressing enter', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<BfsCheckbox onChange={handleChange} tabIndex="0" />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();

    await user.keyboard('[Enter]');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onChange with the correct parameters', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    const testName = 'testCheckbox';
    const testParam = { key: 'value' };
    render(<BfsCheckbox name={testName} onChange={handleChange} param={testParam} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(expect.anything(), testName, expect.any(Boolean), testParam);
  });
});
