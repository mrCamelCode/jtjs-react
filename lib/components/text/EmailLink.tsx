import { Children } from 'react';
import { Link, LinkProps } from './Link';

export interface EmailLinkProps extends LinkProps {
  email: string;
}

/**
 * A link that allows a shortcut to email an address.
 *
 * If you don't include any children, the link will use the email for its text.
 */
export const EmailLink = ({ ref, email, children, ...otherProps }: EmailLinkProps) => {
  return (
    <Link href={`mailto:${email}`} {...otherProps} ref={ref}>
      {Children.count(children) === 0 ? email : children}
    </Link>
  );
};
