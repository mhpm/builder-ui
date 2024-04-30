import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/** @jsxImportSource @emotion/react */ 
import { css } from '@emotion/react';

const transitionDuration = '0.1s';

const stLabel = (asToggle) => css`
  display: flex;
  align-items: center;
  width: auto;
  margin-left: ${asToggle ? 'var(--sp-2xs, 10px)' : '30px'};
  margin-right: ${asToggle ? 'var(--sp-2xs, 10px)' : 'var(--sp-2xl, 20px)'};
  height: inherit;
`;

const stBfsCheckboxMain = (asToggle) => css`
  display: flex;
  position: relative;
  cursor: pointer;
  height: var(--sp-4xl, 24px);
  width: ${asToggle ? '36px' : 'var(--sp-4xl, 24px)'};

  input {
    display: none;
  }

  .checkbox {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--sp-4xl, 24px);
    width: var(--sp-4xl, 24px);
    background-color: var(--color-white);
    border-radius: var(--sp-4xs, 6px);
    transition: all ${transitionDuration} ease-out;
    border: var(--sp-9xs, 1px) solid var(--color-contrast-normal);
  }

  input:checked ~ .checkbox {
    background-color: var(--color-tertiary);
    border-color: var(--color-tertiary);
  }

  input:checked:disabled ~ .checkbox {
    background-color: var(--color-contrast-lower);
    border-color: var(--color-contrast-normal);
    cursor: not-allowed;
  }

  input:disabled ~ .checkbox {
    background-color: var(--color-contrast-lower);
    border-color: var(--color-contrast-normal);
    cursor: not-allowed;
  }

  /*************************************************
  * ⬇️ TOGGLE STARTS ⬇️
  */
  .toggle {
    position: relative;
    display: inline-block;
    width: 36px;
    height: var(--sp-2xl, 20px);
    background-color: var(--color-contrast-lower);
    border-radius: var(--sp-2xl, 20px);
    transition: all ${transitionDuration} ease-out;

    &:after {
      content: '';
      position: absolute;
      width: var(--sp-lg, 16px);
      height: var(--sp-lg, 16px);
      border-radius: 50%;
      background-color: white;
      top: var(--sp-8xs, 2px);
      left: var(--sp-8xs, 2px);
      transition: all ${transitionDuration} ease-out;
    }
  }

  input:checked ~ .toggle::after {
    left: var(--sp-xl, 18px);
  }

  input:checked ~ .toggle {
    background-color: var(--color-tertiary);
    border-color: var(--color-tertiary);
  }

  input:checked:disabled ~ .toggle {
    background-color: var(--color-contrast-normal);
    border-color: var(--color-contrast-normal);
    cursor: not-allowed;
  }

  input:disabled ~ .toggle {
    background-color: var(--color-contrast-low);
    cursor: not-allowed;
  }
  /*
  * ⬆️ TOGGLE END ⬆️
  *************************************************/

  /*************************************************
  * ⬇️ CHECKMARK ICON STARTS ⬇️
  */
  .checkbox::before {
    position: absolute;
    content: '';
    transform: rotate(-45deg) scale(1);
    opacity: 0;
    left: var(--sp-3xs, 8px);
    top: var(--sp-2xs, 10px);
    width: 9px;
    height: var(--sp-8xs, 2px);
    background-color: var(--color-white);
    border-radius: var(--sp-6xs, 4px);
    transition: all ${transitionDuration} ease-out;
  }

  .checkbox::after {
    position: absolute;
    content: '';
    transform: rotate(45deg) scale(1);
    opacity: 0;
    left: var(--sp-4xs, 6px);
    top: 11px;
    width: var(--sp-5xs, 5px);
    height: var(--sp-8xs, 2px);
    background-color: var(--color-white);
    border-radius: var(--sp-6xs, 4px) var(--sp-6xs, 4px) var(--sp-8xs, 2px)
      var(--sp-6xs, 4px);
    transition: all ${transitionDuration} ease-out;
  }

  input:checked ~ .checkbox::before {
    opacity: 1;
  }

  input:checked ~ .checkbox::after {
    opacity: 1;
  }

  input:checked:disabled ~ .checkbox::before {
    background-color: var(--color-contrast-normal);
    opacity: 1;
  }

  input:checked:disabled ~ .checkbox::after {
    background-color: var(--color-contrast-normal);
    opacity: 1;
  }
  /*
  * ⬆️ CHECKMARK ICON END ⬆️
  *************************************************/
`;

const stCheckWithLabel = (isStringLabel, isToggle) => css`
  width: auto;
  vertical-align: text-bottom;
  ${isStringLabel && !isToggle ? 'display: inline' : 'align-items: center; display: flex'};
`;

/**
 * Generic reusable checkbox for any project which follows
 * the conventions from BFS Design and Component Library
 * It can be `checked` and/or `disabled` by default setting
 * those properties as desired.
 *
 * The checkbox receives an onChange property which is a
 * *callback* function handler to be executed on every click
 * on the checkbox. The `callback` will return the value of
 * the property `param` if one has been set.
 *
 */
export const BfsCheckbox = ({
  'data-testid': dataTestId,
  name,
  checked,
  disabled,
  onChange,
  param,
  asToggle,
  label,
  tabIndex,
}) => {
  const [checkedStatus, setCheckedStatus] = useState(checked);

  const changeHandle = useCallback((ev) => {
    ev.stopPropagation();
    setCheckedStatus(!checkedStatus);

    if (onChange) {
      if (param !== null) {
        onChange(ev, name, !checkedStatus, param);
      } else {
        onChange(ev, name, !checkedStatus);
      }
    }
  }, [checkedStatus, onChange, param, name]);

  const KeyDownHandler = useCallback((ev) => {
    if (ev.code !== 'Tab') {
      ev.preventDefault();
    }

    if (
      ev.code === 'Space'
      || ev.code === 'Enter') {
      changeHandle(ev);
    }
  }, [changeHandle]);

  return (
    <label id={`checkboxLabel-${name}`} css={[stBfsCheckboxMain(asToggle), label && stCheckWithLabel(typeof label === 'string', asToggle)]}>
      <input
        data-testid={dataTestId}
        type="checkbox"
        name={name}
        checked={checkedStatus}
        onChange={changeHandle}
        disabled={disabled}
      />
      {label && <span className="text" css={stLabel(asToggle)}>{label}</span>}
      <span
        className={asToggle ? 'toggle' : 'checkbox'}
        role="checkbox"
        aria-checked={checkedStatus}
        tabIndex={tabIndex}
        onKeyDown={KeyDownHandler}
        aria-labelledby={`checkboxLabel-${name}`}
      >
      </span>
    </label>
  );
};

BfsCheckbox.displayName = 'BfsCheckbox';

BfsCheckbox.propTypes = {
  /**
   * Test id only for unit testing element selection.
   */
  'data-testid': PropTypes.string,

  /**
   * The name of the input.
   */
  name: PropTypes.string,

  /**
   * The label for the checkbox
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),

  /**
   * The value of the checked attribute
   */
  checked: PropTypes.bool,

  /**
   * This flag set the checkbox disabled. When is disabled, the checkbox
   * onChange event it's not available and the styles change to reflect
   * the unavailability of the button.
   */
  disabled: PropTypes.bool,

  /**
   * Callback function to run when the checkbox is clicked. It will
   * return the value the `param` property was set with if set.
   */
  onChange: PropTypes.func,

  /**
   * Param to be return with the callback function call set by
   * `onChange` property, if anything was set.
   */
  param: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),

  /**
   * asToggle changes the appereance of the checkbox to a toggle
   */
  asToggle: PropTypes.bool,

  /**
   * Checkbox tabIndex
   */
  tabIndex: PropTypes.string,
};

BfsCheckbox.defaultProps = {
  'data-testid': undefined,
  name: '',
  label: '',
  checked: false,
  disabled: false,
  param: null,
  asToggle: false,
  tabIndex: '0',
};
