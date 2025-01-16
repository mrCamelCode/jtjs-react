import { Children } from 'react';
import { Link, LinkProps } from './Link';

export interface PhoneLinkProps extends LinkProps {
  phoneNumber: string;
}

/**
 * A link that allows a shortcut to call a phone number.
 *
 * If you don't include any children, the link will use the phone number for its text.
 */
export const PhoneLink = ({ ref, phoneNumber, children, ...otherProps }: PhoneLinkProps) => {
  return (
    <Link href={`tel:${phoneNumber}`} {...otherProps} ref={ref}>
      {Children.count(children) === 0 ? phoneNumber : children}
    </Link>
  );
};
