import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoadView, LoadViewProps } from '../LoadView';

const renderLoadView = (props: Partial<LoadViewProps> = {}) => {
  const defaultProps: LoadViewProps = {
    children: [],
    isLoading: true,
  };

  return render(<LoadView {...defaultProps} {...props} />);
};

describe('LoadView', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("doesn't show the content when it's loading", () => {
    renderLoadView({
      children: <p>Hello world!</p>,
    });

    expect(() => screen.getByText('Hello World!')).toThrow();
  });

  it("shows the content when it's not loading", () => {
    renderLoadView({
      isLoading: false,
      children: <p>Hello world!</p>,
    });

    expect(screen.getByText('Hello world!')).not.toBeNull();
  });

  it('properly uses the provided loadingComponent', () => {
    renderLoadView({
      isLoading: true,
      loadingComponent: <p>Test loading component</p>,
    });

    expect(screen.getByText('Test loading component')).not.toBeNull();
  });

  describe('useSimpleLoadIndicator', () => {
    it("doesn't use the simple loading component when false", () => {
      renderLoadView({
        isLoading: true,
        useSimpleLoadIndicator: false,
      });

      expect(() => screen.getByText('Loading...')).toThrow();
    });
    it('uses the simple loading component when true', () => {
      renderLoadView({
        isLoading: true,
        useSimpleLoadIndicator: true,
      });

      expect(() => screen.getByText('Loading...')).not.toBeNull();
    });
    it('shows the simple loading indicator even if a loadingComponent is given', () => {
      renderLoadView({
        isLoading: true,
        useSimpleLoadIndicator: true,
        loadingComponent: <p>Test loading component</p>,
      });

      expect(() => screen.getByText('Loading...')).not.toBeNull();
    });
  });
});
