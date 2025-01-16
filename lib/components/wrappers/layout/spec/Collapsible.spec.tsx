import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { HideBehaviour } from '../../../../enums';
import { Collapsible, CollapsibleProps } from '../Collapsible';

let isCollapsed = false;
const headingText = 'Collapsible Heading';
const contentText = 'Content!';
const onChangeCollapsed = vi.fn((newIsCollapsed: boolean) => (isCollapsed = newIsCollapsed));

const renderCollapsible = (props: Partial<CollapsibleProps> = {}) => {
  const defaultProps: CollapsibleProps = {
    onChangeCollapsed,
    heading: headingText,
    children: contentText,
  };

  return render(<Collapsible {...defaultProps} {...props} />);
};

describe('Collapsible', () => {
  beforeEach(() => {
    isCollapsed = false;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('controlled', () => {
    test('changes collapsed state when the header is clicked', async () => {
      renderCollapsible({
        isCollapsed,
      });

      expect(isCollapsed).toBe(false);

      await act(async () => {
        await userEvent.click(screen.getByText(headingText));
      });

      expect(isCollapsed).toBe(true);
    });

    test('changes collapsed state when the button in the header is clicked', async () => {
      renderCollapsible({
        isCollapsed,
      });

      expect(isCollapsed).toBe(false);

      await act(async () => {
        await userEvent.click(screen.getByTestId('collapsible-collapse-button'));
      });

      expect(isCollapsed).toBe(true);
    });

    test('changes collapsed state when the button in the header is focused and the user presses Space', async () => {
      renderCollapsible({
        isCollapsed,
      });

      expect(isCollapsed).toBe(false);

      await act(async () => {
        const button = screen.getByTestId('collapsible-collapse-button');

        await userEvent.type(button, '{space}');
      });

      expect(isCollapsed).toBe(true);
    });

    test('changes collapsed state when the button in the header is focused and the user presses Enter', async () => {
      renderCollapsible({
        isCollapsed,
      });

      expect(isCollapsed).toBe(false);

      const button = screen.getByTestId('collapsible-collapse-button');
      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(isCollapsed).toBe(true);
    });

    test('the content is visible when not collapsed', () => {
      renderCollapsible({
        isCollapsed: false,
        collapseBehaviour: HideBehaviour.Remove,
      });

      const content = screen.queryByText(contentText);

      expect(content).not.toBeNull();
      expect(content?.style.visibility).toBe('visible');
    });

    test('the content is not in the DOM when collapseBehaviour is Remove', () => {
      renderCollapsible({
        isCollapsed: true,
        collapseBehaviour: HideBehaviour.Remove,
      });

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('the content is still in the DOM when the collapseBehaviour is Hide', () => {
      renderCollapsible({
        isCollapsed: true,
        collapseBehaviour: HideBehaviour.Hide,
      });

      expect(screen.queryByText(contentText)).not.toBeNull();
    });

    test('the heading is visible', () => {
      renderCollapsible({
        heading: 'Some Heading',
      });

      expect(screen.queryByText('Some Heading')).not.toBeNull();
    });
  });

  describe('uncontrolled', () => {
    test('changes collapsed state when the header is clicked', async () => {
      renderCollapsible();

      await act(async () => {
        await userEvent.click(screen.getByText(headingText));
      });

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('changes collapsed state when the button in the header is clicked', async () => {
      renderCollapsible();

      await act(async () => {
        await userEvent.click(screen.getByTestId('collapsible-collapse-button'));
      });

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('changes collapsed state when the button in the header is focused and the user presses Space', async () => {
      renderCollapsible();

      await act(async () => {
        const button = screen.getByTestId('collapsible-collapse-button');

        await userEvent.type(button, '{space}');
      });

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('changes collapsed state when the button in the header is focused and the user presses Enter', async () => {
      renderCollapsible();

      const button = screen.getByTestId('collapsible-collapse-button');
      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('the content is not in the DOM when collapseBehaviour is Remove', () => {
      renderCollapsible({
        defaultIsCollapsed: true,
        collapseBehaviour: HideBehaviour.Remove,
      });

      expect(screen.queryByText(contentText)).toBeNull();
    });

    test('the content is still in the DOM when the collapseBehaviour is Hide', () => {
      renderCollapsible({
        defaultIsCollapsed: true,
        collapseBehaviour: HideBehaviour.Hide,
      });

      expect(screen.queryByText(contentText)).not.toBeNull();
    });

    test('the heading is visible', () => {
      renderCollapsible({
        heading: 'Some Heading',
      });

      expect(screen.queryByText('Some Heading')).not.toBeNull();
    });

    test('the content starts visible when the default is to be expanded', () => {
      renderCollapsible({
        defaultIsCollapsed: false,
        collapseBehaviour: HideBehaviour.Remove,
      });

      const content = screen.queryByText(contentText);

      expect(content).not.toBeNull();
      expect(content?.style.visibility).toBe('visible');
    });

    test('the content starts invisible when the default is to be collapsed', () => {
      renderCollapsible({
        defaultIsCollapsed: true,
        collapseBehaviour: HideBehaviour.Remove,
      });

      const content = screen.queryByText(contentText);

      expect(content).toBeNull();
    });
  });
});
