import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostActions from './PostActions';
import '@testing-library/jest-dom/vitest';

describe('PostActions Component', () => {
  const defaultProps = {
    comments: 5,
    upvotes: 10,
    downvotes: 2,
    onVote: vi.fn(),
    hasUpvoted: false,
    hasDownvoted: false,
    showComments: true,
  };

  const renderComponent = (overrideProps = {}) => {
    const props = { ...defaultProps, ...overrideProps };
    return render(<PostActions {...props} />);
  };

  describe('Rendering Behavior', () => {
    it('should render comments count when showComments is true and comments are defined', () => {
      renderComponent();
      expect(
        screen.getByText(defaultProps.comments.toString())
      ).toBeInTheDocument();
    });

    it('should not render comments count when showComments is false', () => {
      renderComponent({ showComments: false });
      expect(
        screen.queryByText(defaultProps.comments.toString())
      ).not.toBeInTheDocument();
    });

    it('should not render comments count when comments is undefined', () => {
      renderComponent({ comments: undefined });
      expect(screen.queryByText('undefined')).not.toBeInTheDocument();
    });

    it('should render vote counts correctly', () => {
      renderComponent();
      expect(
        screen.getByText(defaultProps.upvotes.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.downvotes.toString())
      ).toBeInTheDocument();
    });

    it('should apply "voted" class when hasUpvoted is true', () => {
      renderComponent({ hasUpvoted: true });
      const upvoteButton = screen.getByRole('button', {
        name: new RegExp(defaultProps.upvotes.toString()),
      });
      expect(upvoteButton).toHaveClass('voted');
    });
  });

  describe('Interaction Behavior', () => {
    it('should call onVote with "up" when upvote button is clicked', () => {
      const mockOnVote = vi.fn();
      renderComponent({ onVote: mockOnVote });

      const upvoteButton = screen
        .getByText(defaultProps.upvotes.toString())
        .closest('button');
      fireEvent.click(upvoteButton);

      expect(mockOnVote).toHaveBeenCalledTimes(1);
      expect(mockOnVote).toHaveBeenCalledWith('up');
    });

    it('should call onVote with "down" when downvote button is clicked', () => {
      const mockOnVote = vi.fn();
      renderComponent({ onVote: mockOnVote });

      const downvoteButton = screen
        .getByText(defaultProps.downvotes.toString())
        .closest('button');
      fireEvent.click(downvoteButton);

      expect(mockOnVote).toHaveBeenCalledTimes(1);
      expect(mockOnVote).toHaveBeenCalledWith('down');
    });

    it('should prevent event propagation when clicked', () => {
      const parentHandler = vi.fn();
      const { container } = render(
        <div onClick={parentHandler}>
          <PostActions {...defaultProps} />
        </div>
      );

      const upvoteButton = screen
        .getByText(defaultProps.upvotes.toString())
        .closest('button');
      fireEvent.click(upvoteButton);

      expect(defaultProps.onVote).toHaveBeenCalled();
      expect(parentHandler).not.toHaveBeenCalled();
    });
  });
});
