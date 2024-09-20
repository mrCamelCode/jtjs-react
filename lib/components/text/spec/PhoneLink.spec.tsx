import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PhoneLink, PhoneLinkProps } from '../PhoneLink';

const renderPhoneLink = (props: Partial<PhoneLinkProps> = {}) => {
  const defaultProps: PhoneLinkProps = {
    phoneNumber: '123-123-1234',
  };

  return render(<PhoneLink {...defaultProps} {...props} />);
};

describe('PhoneLink', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('Text matches phone number when children are ommitted', () => {
    renderPhoneLink();

    expect(screen.getByText('123-123-1234')).not.toBeNull();
  });
  test('Text is children when children are provided', () => {
    renderPhoneLink({
      children: 'custom text',
    });

    expect(() => screen.getByText('123-123-1234')).toThrow();
    expect(screen.getByText('custom text')).not.toBeNull();
  });
});
