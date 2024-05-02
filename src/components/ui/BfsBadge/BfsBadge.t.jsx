import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { BfsBadge } from './BfsBadge';

describe('BfsBadge component render', () => {
  it('Correctly, default', () => {
    const { getByText } = render(<BfsBadge />);
    expect(getByText('label')).toBeInTheDocument();
  });

  it('Correctly with testid', () => {
    const { getByTestId } = render(<BfsBadge data-testid="badge" />);
    expect(getByTestId('badge')).toBeInTheDocument();
  });

  it('Correctly with children', () => {
    const { getByTestId } = render(<BfsBadge data-testid="badge"><span data-testid="descendant">badge with children</span></BfsBadge>);

    const descendant = getByTestId('descendant');
    expect(getByTestId('badge')).toContainElement(descendant);
    expect(descendant).toHaveTextContent('badge with children');
  });

  it('Correctly, matching snapshot', () => {
    const component = renderer.create(<BfsBadge />);
    expect(component).toMatchSnapshot();
  });
});

describe('BfsBadge component property', () => {
  describe('label', () => {
    it('Set to any text value', () => {
      const customLabel = 'Custom Label';
      const { getByText, getByTestId } = render(<BfsBadge data-testid="badge" label={customLabel} />);
      expect(getByText(customLabel)).toBeInTheDocument();
      expect(getByTestId('badge')).toHaveTextContent(customLabel);
    });

    it('Set to empty value', () => {
      const { getByTestId } = render(<BfsBadge data-testid="badge" label="" />);
      expect(getByTestId('badge')).not.toHaveTextContent();
      expect(getByTestId('badge')).toHaveTextContent('');
    });
  });
});
