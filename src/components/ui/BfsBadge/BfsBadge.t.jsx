import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BfsBadge } from './BfsBadge'; // Adjust the import path as necessary

describe('BfsBadge Component', () => {
  test('renders with default props', () => {
    render(<BfsBadge />);
    const badgeElement = screen.getByText('label');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveStyle('background-color: var(--bfs-badge-bg-color, var(--rol-primary-bg-color))');
  });

  test('renders with custom label', () => {
    const customLabel = 'Custom Label';
    render(<BfsBadge label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  test('renders with children instead of label', () => {
    const childElement = <span>Child Content</span>;
    render(<BfsBadge>{childElement}</BfsBadge>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('applies mode styles correctly', () => {
    const { rerender } = render(<BfsBadge mode="primary" />);
    expect(screen.getByText('label')).toHaveStyle('background-color: var(--bfs-badge-bg-color, var(--rol-primary-bg-color))');

    rerender(<BfsBadge mode="secondary" />);
    expect(screen.getByText('label')).toHaveStyle('background-color: var(--bfs-badge-bg-color, var(--rol-secondary-bg-color))');

    rerender(<BfsBadge mode="positive" />);
    expect(screen.getByText('label')).toHaveStyle('background-color: var(--bfs-badge-bg-color, var(--rol-positive-bg-color))');

    rerender(<BfsBadge mode="negative" />);
    expect(screen.getByText('label')).toHaveStyle('background-color: var(--bfs-badge-bg-color, var(--rol-negative-bg-color))');
  });

  test('accepts data-testid for testing', () => {
    const testId = 'custom-badge';
    render(<BfsBadge data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
