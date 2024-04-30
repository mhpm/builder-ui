import React from 'react'
import { memo } from 'react';
import PropTypes from 'prop-types';

/** @jsxImportSource @emotion/react */ 
import { css } from '@emotion/react';

const st = {
  badge: css`
    align-self: var(--bfs-badge-align-self, center);
    border-radius: var(--sp-2xl, 20px);
    border: solid;
    display: inline-block;
    padding: var(--bfs-badge-padding , var(--sp-4xs, 6px) var(--sp-md, 15px));
    line-height: var(--sp-xs, 12px);
    text-transform: uppercase;
    margin: var(--bfs-badge-margin, var(--sp-5xs, 5px));
    outline: 0;
    border-width: var(--rol-primary-border-thick);
    color: var(--bfs-badge-text-color, var(--rol-primary-text-color));
    font-size: var(--bfs-badge-text-size, var(--sm-2xs));
  `,
  modes: {
    primary: css`
      background-color: var(--bfs-badge-bg-color, var(--rol-primary-bg-color));
      border-color: var(--bfs-badge-border-color, var(--rol-primary-border-color));
      color: var(--bfs-badge-text-color , var(--color-white));
    `,
    secondary: css`
      background-color: var(--bfs-badge-bg-color, var(--rol-secondary-bg-color));
      border-color: var(--bfs-badge-border-color, var(--rol-secondary-border-color));
      color: var(--bfs-badge-text-color , --rol-secondary-text-color);
    `,
    positive: css`
      background-color: var(--bfs-badge-bg-color, var(--rol-positive-bg-color));
      border-color: var(--bfs-badge-border-color, var(--rol-positive-border-color));
      color: var(--bfs-badge-text-color , var(--color-white));
    `,
    negative: css`
      background-color: var(--bfs-badge-bg-color, var(--rol-negative-bg-color));
      border-color: var(--bfs-badge-border-color, var(--rol-negative-border-color));
      color: var(--bfs-badge-text-color , var(--color-white));
    `,
  }
};

/**
 * General and reusable badge for all the projects, that follows the color
 * conventions from the BFS Design and Component Library.
 * `BfsBadge` provides the following custom properties for styling:
 *
 * | Custom property                | Description                   | Default            |
 * |--------------------------------|-------------------------------|---------:          |
 * | --bfs-badge-margin             | Badge margin                  |    5px             |
 * | --bfs-badge-bg-color           | Badge background color        | #3281e2          |
 * | --bfs-badge-border-color       | Badge border color            | #3281e2          |
 * | --bfs-badge-text-color         | Badge text color              | #ffffff          |
 * | --bfs-badge-text-size          | Badge text size               | 0.75rem            |
 * | --bfs-badge-padding            | Badge padding                 | 6px 15px 6px 15px  |
 * | --bfs-badge-align-self         | Badge self-align              |       center       |
 *
 */
export const BfsBadge = memo(
  ({ 'data-testid': dataTestId,
    label,
    mode,
    children 
  }) => {
    return (
      <div data-testid={dataTestId} css={[st.badge, st.modes[mode]]}>
        {children || label}
      </div>
    )
  });

BfsBadge.displayName = 'BfsBadge';

BfsBadge.propTypes = {
  /**
   * Test id only for unit testing element selection.
   */
  'data-testid': PropTypes.string,

  /**
   * This is the text string to show as badge label.
   */
  label: PropTypes.string,

  /**
   * Mode how badge will be render.
   */
  mode: PropTypes.oneOf(['primary', 'secondary', 'negative', 'positive']),

  /**
   * The badge children to render.
   */
  children: PropTypes.node,
};

BfsBadge.defaultProps = {
  'data-testid': undefined,
  label: 'label',
  mode: 'primary',
};
