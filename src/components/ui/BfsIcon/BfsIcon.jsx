import React from 'react';
import {
  FaSpinner,
  FaCog,
  FaCircleNotch,
  FaStar,
  FaRegStar,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

import { css } from '@emotion/react';

const stIcon = css`
  margin: 0;
  padding: 0;
`;

const stSpin = css`
  animation: spin 2s infinite linear;
`;

export const icons = {
  star: FaStar,
  starhollow: FaRegStar,
  spinner: FaSpinner,
  cog: FaCog,
  circlenotch: FaCircleNotch,
};

/**
 * Reusable icon component that follows the conventions from the BFS Design and
 * Component Library.
 *
 * It comes in 3 different icons to chose using the `icon` property:
 * ***spinner***, ***cog***, and ***circlenotch***.
 *
 * The icon can be set to spin so we can use it as spinner by the `spin`
 * boolean property.
 *
 * The size can be set by the `size` property.
 *
 */
export const BfsIcon = ({
  'data-testid': dataTestId,
  icon,
  spin,
  size,
}) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent
      data-testid={dataTestId}
      css={[stIcon, spin && stSpin]}
      size={size}
    />
  );
};

BfsIcon.propTypes = {
  /**
   * Test id only for unit testing element selection.
   */
  'data-testid': PropTypes.string,

  /**
   * The name of the icon to show.
   */
  icon: PropTypes.oneOf(Object.keys(icons)),

  /**
   * Flag to apply spinning animation
   */
  spin: PropTypes.bool,

  /**
   * Icon size in pixels
   */
  size: PropTypes.string,
};

BfsIcon.displayName = 'BfsIcon';

BfsIcon.defaultProps = {
  'data-testid': undefined,
  icon: 'spinner',
  spin: false,
  size: '16',
};
