import React from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/react';

import { Dropdown } from 'semantic-ui-react';

const stDropdownContainer = css`
  margin-bottom: var(--bfs-dropdown-margin-bottom, 0);

  .stDropdown {
    min-width: var(--bfs-min-width, 200px) !important;

    div.menu > div.item:hover,
    div.menu > div.selected.item {
      background: var(--color-primary, #0077c7);
      color: var(--color-white, #fff);

      .description {
        color: var(--color-white, #fff);
      }
    }

    div.menu > div.active.item {
      font-weight: normal;
    }

    .menu > .item > .description {
      color: var(--color-black, #000000);
    }
  }
`;

export const BfsDropdown = ({
  'data-testid': dataTestId,
  placeholder,
  dropdownOptions,
  isSearchable,
  isFluid,
  onChange,
  name,
  id,
  clearable,
  selectedValue,
  isSelectOnBlur,
  disabled,
}) => {
  const dropdownChangeHandler = (ev, { value }) => {
    ev.stopPropagation();
    if (onChange) {
      onChange(ev, { value });
    }
  };

  return (
    <div css={stDropdownContainer}>
      <Dropdown
        data-testid={dataTestId}
        className="stDropdown"
        placeholder={placeholder}
        onChange={dropdownChangeHandler}
        search={isSearchable}
        fluid={isFluid}
        name={name}
        id={id}
        selection
        clearable={clearable}
        options={dropdownOptions}
        value={selectedValue}
        selectOnBlur={isSelectOnBlur}
        disabled={disabled}
      />
    </div>
  );
};

BfsDropdown.displayName = 'BfsDropdown';

BfsDropdown.propTypes = {
  /**
   * Test id only for unit testing element selection.
   */
  'data-testid': PropTypes.string,
  /**
   * The name of the dropdown.
   */
  name: PropTypes.string,

  /**
   * The id of the dropdown.
   */
  id: PropTypes.string,

  /**
   * The placeholder for the dropdown.
   */
  placeholder: PropTypes.string,

  /**
   * The values for the dropdown list.
   */
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),

  /**
   * This flag sets the dropdown to be searchable.
   */
  isSearchable: PropTypes.bool,

  /**
   * Callback function to run when the option is selected.
   */
  onChange: PropTypes.func,

  /**
   * Fluid makes the input use all the space available, 100% width.
   */
  isFluid: PropTypes.bool,

  /**
   * This flag sets the dropdown to be clearable.
   */
  clearable: PropTypes.bool,

  /**
   * Selected value for the dropdown.
   */
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),

  /**
   * This flag autoselects the choice on blur.
   */
  isSelectOnBlur: PropTypes.bool,

  /**
   * This flag disables the dropdown.
   */
  disabled: PropTypes.bool,
};

BfsDropdown.defaultProps = {
  'data-testid': undefined,
  name: '',
  id: '',
  placeholder: 'Select an option',
  dropdownOptions: [],
  isSearchable: true,
  isFluid: false,
  clearable: true,
  selectedValue: null,
  isSelectOnBlur: true,
  disabled: false,
  onChange: null,
};
