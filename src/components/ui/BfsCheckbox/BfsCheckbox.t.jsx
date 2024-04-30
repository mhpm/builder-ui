import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BfsCheckbox from '.'; // Adjust the import path as necessary

describe('BfsCheckbox', () => {
  // Test rendering with minimal props
  it('renders correctly', () => {
    render(<BfsCheckbox name="test-checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  // Test rendering with a label
  it('renders with a label when provided', () => {
    const label = 'Test Label';
    render(<BfsCheckbox label={label} name="test-checkbox" />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  // Test the checked state changes on click
  it('toggles checked state on click', () => {
    const handleChange = jest.fn();
    render(<BfsCheckbox onChange={handleChange} data-testid="check" />);
    const checkbox = screen.getByTestId('check');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  // Test Properly handles dynamic checked prop change
  it('properly handles dynamic checked prop change', () => {
    const { rerender } = render(<BfsCheckbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    rerender(<BfsCheckbox checked={true} />);
    expect(checkbox).toBeChecked();
  });

  // Test keyboard interaction
  it('toggles checked state on pressing space or enter', () => {
    const handleChange = jest.fn();
    render(<BfsCheckbox onChange={handleChange} name="test-checkbox" tabIndex="0" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { code: 'Space' });
    expect(handleChange).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(checkbox, { code: 'Enter' });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  // Test the onChange callback with parameters
  it('calls onChange with the correct parameters', () => {
    const handleChange = jest.fn();
    const testName = 'testCheckbox';
    const testParam = { key: 'value' };
    render(<BfsCheckbox name={testName} data-testid="check" onChange={handleChange} param={testParam} />);

    const checkbox = screen.getByTestId('check');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(expect.anything(), testName, expect.any(Boolean), testParam);
  });

  // Test disabled state
  it('does not trigger onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<BfsCheckbox onChange={handleChange} disabled name="test-checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Test appearance as a toggle
  it('renders as a toggle when asToggle is true', () => {
    render(<BfsCheckbox asToggle name="toggle-checkbox" />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toHaveClass('toggle'); // Ensure your implementation adds identifiable classes or attributes to differentiate appearances
  });
});
