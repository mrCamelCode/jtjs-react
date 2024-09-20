import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { EmailLink, EmailLinkProps } from '../EmailLink';

const renderEmailLink = (props: Partial<EmailLinkProps> = {}) => {
  const defaultProps: EmailLinkProps = {
    email: 'email@email.com',
  };

  return render(<EmailLink {...defaultProps} {...props} />);
};

describe('EmailLink', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('Text matches email when children are ommitted', () => {
    renderEmailLink();

    expect(screen.getByText('email@email.com')).not.toBeNull();
  });
  test('Text is children when children are provided', () => {
    renderEmailLink({
      children: 'custom text',
    });

    expect(() => screen.getByText('email@email.com')).toThrow();
    expect(screen.getByText('custom text')).not.toBeNull();
  });
});
