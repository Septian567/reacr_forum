import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import DetailSkeleton from './DetailSkeleton';

describe('DetailSkeleton component', () => {
  it('should render skeleton wrapper with correct layout', () => {
    const { container } = render(<DetailSkeleton />);
    const wrapper = container.firstChild;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle('flex-direction: column');
  });

  it('should render skeleton avatar', () => {
    render(<DetailSkeleton />);
    const avatar = screen.getByTestId('skeleton-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should render one short skeleton line (username/title)', () => {
    render(<DetailSkeleton />);
    const shortLine = screen.getByTestId('skeleton-line-short');
    expect(shortLine).toBeInTheDocument();
  });

  it('should render multiple content skeleton lines (e.g., 5 lines)', () => {
    render(<DetailSkeleton />);
    const lines = screen.getAllByTestId('skeleton-line');
    expect(lines.length).toBeGreaterThanOrEqual(5);
  });

  it('should render skeleton action buttons (e.g., 3 buttons)', () => {
    render(<DetailSkeleton />);
    const buttons = screen.getAllByTestId('skeleton-button');
    expect(buttons).toHaveLength(3);
  });
});
