import React from 'react';
import { render } from '@testing-library/react';
import { matchers } from '@emotion/jest';

import { BfsIcon, icons } from './BfsIcon';

expect.extend(matchers);

describe('BfsIcon component render', () => {
  it('correctly without crashing with testid and the spinner icon by default', () => {
    const { getByTestId } = render(<BfsIcon data-testid="icon" />);
    const icon = getByTestId('icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
  });
});

describe('BfsIcon component property', () => {
  Object.keys(icons).forEach((icon) => {
    it(`icon ${icon}`, () => {
      const { getByTestId } = render(<BfsIcon data-testid="icon" icon={icon} />);
      const iconCmp = getByTestId('icon');

      expect(iconCmp).toBeInTheDocument();
      expect(iconCmp).toMatchSnapshot();
    });
  });

  test('applies custom className when provided', () => {
    const { getByTestId } = render(<BfsIcon data-testid="icon" />);

    expect(getByTestId('icon')).toBeInTheDocument();
  });
});
