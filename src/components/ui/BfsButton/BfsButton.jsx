/** @jsxImportSource @emotion/react */ 
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { BfsIcon } from '../BfsIcon';

export const modes = {
  primary: 'primary',
  secondary: 'secondary',
  negative: 'negative',
  positive: 'positive',
  primaryGhost: 'primary-ghost',
  secondaryGhost: 'secondary-ghost',
  negativeGhost: 'negative-ghost',
  positiveGhost: 'positive-ghost',
};

const modeStyle = (mode) => css`
  background-color: var(--rol-${mode}-bg-color);
  border-color: var(--rol-${mode}-border-color);
  border-width: var(--rol-${mode}-border-thick);
  color: var(--rol-${mode}-text-color);
  font-size: var(--rol-${mode}-text-size);
  font-weight: var(--rol-${mode}-text-weight);

  &:hover,
  &:focus {
    background-color: var(--rol-${mode}-bg-hover-color);
    border-color: var(--rol-${mode}-border-hover-color);
    ${mode.includes('ghost') && `color: var(--color-white)`};
  }

  &:active {
    background-color: var(--rol-${mode}-bg-active-color);
    border-color: var(--rol-${mode}-border-active-color);
  }

  &[disabled] {
    background-color: var(--rol-${mode}-bg-disabled-color);
    border-color: var(--rol-${mode}-border-disabled-color);
    ${mode.includes('ghost') && `color: var(--rol-${mode}-border-color)`};
    cursor: not-allowed;
  }
`;

const stBfsButton = css`
  border: solid;
  border-radius: var(--rol-border-radius);
  column-gap: var(--sm-6xs, .25rem);
  cursor: pointer;
  margin: var(--bfs-button-margin, var(--sp-5xs, 5px));
  min-height: 30px;
  min-width: 70px;
  outline: 0;
  padding: 9px var(--sp-xs, 12px) var(--sp-3xs, 8px) var(--sp-xs, 12px);
  text-transform: uppercase;
`;

const stContainer = css`
  align-items: center;
  display: inline-flex;
  justify-content: center;
`;

const stFluid = css`
  margin: var(--bfs-button-margin, var(--sp-5xs, 5px) 0);
  width: 100%;
`;

const stLoading = css`
  cursor: wait;

  & .content {
    opacity: 0;
  }
`;

const stModes = {
  primary: modeStyle(modes.primary),
  secondary: modeStyle(modes.secondary),
  negative: modeStyle(modes.negative),
  positive: modeStyle(modes.positive),
  primaryGhost: modeStyle(modes.primaryGhost),
  secondaryGhost: modeStyle(modes.secondaryGhost),
  negativeGhost: modeStyle(modes.negativeGhost),
  positiveGhost: modeStyle(modes.positiveGhost),
  tableHeader: css`
    border: none;
    cursor: pointer;
    font-weight: bold;
  `,
};

const stIcon = (loading) => css`
  align-items: center;
  display: ${loading ? 'flex' : 'none'};
  justify-content: center;
  position: absolute;
`;

/**
 * General and reusable button for all the projects, that follows the color
 * conventions from the BFS Design and Component Library. It can be set as
 * `fluid`, `loading`, and `disabled` modes using those configuration flags
 * properties.
 *
 * It comes in 4 different color schemas to chose using the `mode` property:
 * ***primary***, ***secondary***, ***positive***, and ***negative*** each of
 * then in two versions, *regular* and *ghost*.
 *
 * The button label can be set by the `label` property or if this property is
 * not set, by its `children` content. If there are no children either, it will
 * be set to ***BUTTON***.
 *
 * It will receive at the `onClick` property, a *callback* function handler to
 * run when the button will be clicked. That callback will return the value the
 * property `param` was initialized with if it was set.
 *
 * ### Styling
 * `BfsButton` provides the following custom properties for styling:
 *
 * | Custom property      | Description                | Default              |
 * |----------------------|----------------------------|---------------------:|
 * | --bfs-button-margin  | Button margin              | var(--sp-5xs, 5px)   |
 *
 */
export const BfsButton = memo(
  ({
    'data-testid': dataTestId,
    loading,
    icon,
    disabled,
    fluid,
    label,
    mode,
    onClick,
    param,
    escEnable,
    children,
  }) => {
    const clickHandler = useCallback((ev) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (onClick && !loading && !disabled) {
        if (param !== null) {
          onClick(param);
        } else {
          onClick();
        }
      }
    }, [onClick, param, loading, disabled]);

    const keyDownHandler = useCallback((ev) => {
      ev.stopPropagation();
      if (ev.code === 'Space' || ev.code === 'Enter' || (escEnable && ev.code === 'Escape')) {
        clickHandler(ev);
      }
    }, [clickHandler, escEnable]);

    const content = children || label || 'button';

    return (
      <button
        type="button"
        data-testid={dataTestId}
        css={[
          mode !== 'tableHeader' && stBfsButton,
          loading && stLoading,
          stModes[mode],
          fluid && stFluid,
          stContainer,
        ]}
        onClick={clickHandler}
        onKeyDown={keyDownHandler}
        disabled={disabled}
      >
        <>
          <span className="content">
            {content}
          </span>
          <span css={stIcon(loading)}>
            <BfsIcon data-testid={`icon-${icon}`} icon={icon} spin />
          </span>
        </>
      </button>
    );
  },
);

BfsButton.displayName = 'BfsButton';

BfsButton.propTypes = {
  /**
   * Test id only for unit testing element selection.
   */
  'data-testid': PropTypes.string,

  /**
   * This flag set the button in loading mode. When in loading mode a
   * customizable spinner appears as content for the button.
   */
  loading: PropTypes.bool,

  /**
   * The name of the icon to show as spinner when the button is in loading
   * mode. The icon will being shown instead of the text string from `label`
   * property.
   */
  icon: PropTypes.oneOf(['spinner', 'cog', 'circlenotch']),

  /**
   * This flag set the button disabled. When is disabled, the button click event
   * it's not available and the styles change to reflect the unavailability of
   * the button.
   */
  disabled: PropTypes.bool,

  /**
   * This flag set the button in fluid mode. When is fluid, the button will grow
   * in width to use all the available space. If more than one button are
   * together in fluid mode and their parent container has it's `display`
   * property to `flex`, then their will share the available free space.
   */
  fluid: PropTypes.bool,

  /**
   * This is the text string to show as button label.
   */
  label: PropTypes.string,

  /**
   * The button mode that define the selected color scheme to use. It comes in 4
   * different color schemas, each of then in two versions, *regular* and
   * *ghost*.
   */
  mode: PropTypes.oneOf([
    'primary',
    'secondary',
    'positive',
    'negative',
    'primaryGhost',
    'secondaryGhost',
    'positiveGhost',
    'negativeGhost',
    'tableHeader',
  ]),

  /**
   * Callback function to run when the button is clicked. It will return the
   * value the `param` property was set with, if set.
   */
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Param to be return with the callback function call set by `onClick`
   * property, if anything was set.
   */
  param: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.number,
  ]),

  /**
   * Flag that enable the callback execution pressing the "Escape" key.
   */
  escEnable: PropTypes.bool,
};

BfsButton.defaultProps = {
  'data-testid': undefined,
  loading: false,
  icon: 'spinner',
  disabled: false,
  fluid: false,
  mode: 'primary',
  onClick: null,
  param: null,
  escEnable: false,
  label: 'button',
};
