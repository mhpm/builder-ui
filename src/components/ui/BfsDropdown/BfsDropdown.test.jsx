/* eslint-disable jest-dom/prefer-in-document */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { BfsDropdown } from './BfsDropdown';

describe('BfsButton component render', () => {
  it('correctly without crashing, default', () => {
    render(<BfsDropdown />);
    const dropdown = screen.getByRole('combobox');

    expect(dropdown).toBeInTheDocument();
  });

  it('correctly without crashing with testid', () => {
    render(<BfsDropdown data-testid="dropdown" />);
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });
});

describe('Props:', () => {
  describe('Name', () => {
    it('renders with name prop having a value', () => {
      render(<BfsDropdown name="test-dropdown" />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('name', 'test-dropdown');
    });

    it('renders with name prop having no value', () => {
      render(<BfsDropdown name="" />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('name', '');
    });

    it('renders without name prop', () => {
      render(<BfsDropdown />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('name', '');
    });
  });

  describe('Id', () => {
    it('renders with id prop having a value', () => {
      render(<BfsDropdown id="test-dropdown" />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('id', 'test-dropdown');
    });

    it('renders with id prop having no value', () => {
      render(<BfsDropdown id="" />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('id', '');
    });

    it('renders without id prop', () => {
      render(<BfsDropdown />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('id', '');
    });
  });

  describe('placeholder', () => {
    it('renders with placeholder prop having a value', () => {
      render(<BfsDropdown placeholder="Select an option" />);
      const dropdown = screen.getByRole('alert');
      expect(dropdown).toHaveTextContent('Select an option');
    });

    it('renders with placeholder prop having no value', () => {
      render(<BfsDropdown placeholder="" />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).not.toHaveAttribute('placeholder');
    });

    it('renders without placeholder prop', () => {
      render(<BfsDropdown />);
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).not.toHaveAttribute('placeholder');
    });
  });

  describe('dropdownOptions', () => {
    it('renders with dropdownOptions prop having values', async () => {
      render(
        <BfsDropdown
          dropdownOptions={[
            { key: 1, text: 'Option 1', value: 1 },
            { key: 2, text: 'Option 2', value: 2 },
          ]}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveTextContent('Option 1');
      expect(options[1]).toHaveTextContent('Option 2');
    });

    it('renders with dropdownOptions prop having no values', async () => {
      render(<BfsDropdown dropdownOptions={[]} />);
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.queryAllByRole('option');
      expect(options).toHaveLength(0);
    });

    it('renders without dropdownOptions prop', async () => {
      render(<BfsDropdown />);
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.queryAllByRole('option');
      expect(options).toHaveLength(0);
    });
  });

  describe('isSearchable', () => {
    it('renders with isSearchable prop set to true', async () => {
      render(
        <BfsDropdown
          isSearchable
          dropdownOptions={[
            { key: 1, text: 'Option 1', value: 1 },
            { key: 2, text: 'Option 2', value: 2 },
          ]}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);

      const searchInput = screen.getByRole('textbox');
      await userEvent.type(searchInput, '1');

      const options = screen.queryAllByRole('option');
      expect(options).toHaveLength(1);
    });

    it('renders with isSearchable prop set to false', async () => {
      render(
        <BfsDropdown
          isSearchable={false}
          dropdownOptions={[
            { key: 1, text: 'Option 1', value: 1 },
            { key: 2, text: 'Option 2', value: 2 },
          ]}
        />,
      );

      const dropdown = screen.getByRole('listbox');
      await userEvent.click(dropdown);
      const searchInput = screen.queryByRole('textbox');
      expect(searchInput).not.toBeInTheDocument();
    });

    it('renders without isSearchable prop', async () => {
      render(
        <BfsDropdown
          dropdownOptions={[
            { key: 1, text: 'Option 1', value: 1 },
            { key: 2, text: 'Option 2', value: 2 },
          ]}
        />,
      );

      const dropdown = screen.getByRole('listbox');
      await userEvent.click(dropdown);
      const searchInput = screen.queryByRole('textbox');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('isFluid', () => {
    it('renders with isFluid prop set to true', async () => {
      render(
        <BfsDropdown isFluid />,
      );
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveClass('fluid');
    });

    it('renders without isFluid prop', async () => {
      render(
        <BfsDropdown />,
      );
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).not.toHaveClass('fluid');
    });
  });

  describe('clearable', () => {
    const dropdownOptions = [
      { key: 1, text: 'Option 1', value: 1 },
      { key: 2, text: 'Option 2', value: 2 },
    ];

    it('renders with clearable prop set to true', async () => {
      const handleClick = jest.fn();

      render(
        <BfsDropdown
          clearable
          selectedValue="Option 1"
          onChange={handleClick}
          dropdownOptions={dropdownOptions}
        />,
      );

      const icon = document.querySelector('.icon');
      expect(icon).toHaveClass('clear');

      await userEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with clearable prop set to false', async () => {
      const handleClick = jest.fn();

      render(
        <BfsDropdown
          clearable={false}
          selectedValue="Option 1"
          onChange={handleClick}
          dropdownOptions={dropdownOptions}
        />,
      );
      const icon = document.querySelector('.icon');
      expect(icon).not.toHaveClass('clear');

      await userEvent.click(icon);
      expect(handleClick).not.toHaveBeenCalledTimes(1);
    });
  });

  describe('selectedValue', () => {
    const dropdownOptions = [
      { key: 1, text: 'Option 1', value: 1 },
      { key: 2, text: 'Option 2', value: 2 },
    ];

    it('renders with selectedValue prop set to an existing value', async () => {
      render(
        <BfsDropdown
          selectedValue={1}
          dropdownOptions={dropdownOptions}
        />,
      );

      const input = screen.getByRole('alert');
      expect(input).toHaveTextContent('Option 1');
    });

    it('renders with selectedValue prop set to a non value', async () => {
      render(
        <BfsDropdown
          selectedValue=""
          dropdownOptions={dropdownOptions}
        />,
      );
      const input = screen.getByRole('alert');
      expect(input).toHaveTextContent('Select an option');
    });

    it('renders without selectedValue prop', async () => {
      render(
        <BfsDropdown
          dropdownOptions={dropdownOptions}
        />,
      );
      const input = screen.getByRole('alert');
      expect(input).toHaveTextContent('Select an option');
    });
  });

  describe('disabled', () => {
    const dropdownOptions = [
      { key: 1, text: 'Option 1', value: 1 },
      { key: 2, text: 'Option 2', value: 2 },
    ];

    it('renders with disabled prop set to true', async () => {
      render(
        <BfsDropdown
          disabled
          dropdownOptions={dropdownOptions}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveClass('disabled');
    });

    it('renders with disabled prop set to false', async () => {
      render(
        <BfsDropdown
          disabled={false}
          dropdownOptions={dropdownOptions}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeEnabled();
    });
  });
});

describe('Interactions:', () => {
  describe('isSelectOnBlur', () => {
    const dropdownOptions = [
      { key: 1, text: 'Option 1', value: 1 },
      { key: 2, text: 'Option 2', value: 2 },
    ];

    it('renders with isSelectOnBlur prop set to true', async () => {
      const handleClick = jest.fn();

      render(
        <BfsDropdown
          isSelectOnBlur
          dropdownOptions={dropdownOptions}
          onChange={handleClick}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      await userEvent.tab();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with isSelectOnBlur prop set to false', async () => {
      const handleClick = jest.fn();

      render(
        <BfsDropdown
          isSelectOnBlur={false}
          dropdownOptions={dropdownOptions}
          onChange={handleClick}
        />,
      );
      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      await userEvent.tab();

      expect(handleClick).not.toHaveBeenCalledTimes(1);
    });

    it('renders without isSelectOnBlur prop', async () => {
      const handleClick = jest.fn();

      render(
        <BfsDropdown
          dropdownOptions={dropdownOptions}
          onChange={handleClick}
        />,
      );

      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      await userEvent.tab();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange prop', () => {
    const dropdownOptions = [
      { key: 1, text: 'Option 1', value: 1 },
    ];

    it('when onChange is set ', async () => {
      const handleChange = jest.fn();

      render(
        <BfsDropdown
          onChange={handleChange}
          dropdownOptions={dropdownOptions}
        />,
      );

      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.getByRole('option');
      await userEvent.click(options[0]);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), { value: 1 });
    });

    it('when onChange is set to null', async () => {
      const handleChange = jest.fn();

      render(
        <BfsDropdown
          onChange={null}
          dropdownOptions={dropdownOptions}
        />,
      );

      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.getByRole('option');
      await userEvent.click(options[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('when onChange no present', async () => {
      const handleChange = jest.fn();

      render(
        <BfsDropdown
          dropdownOptions={dropdownOptions}
        />,
      );

      const dropdown = screen.getByRole('combobox');
      await userEvent.click(dropdown);
      const options = screen.getByRole('option');
      await userEvent.click(options[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
