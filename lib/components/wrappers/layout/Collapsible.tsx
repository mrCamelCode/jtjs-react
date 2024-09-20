import { ReactNode, useId, useState } from 'react';
import { HideBehaviour } from '../../../enums';
import { buildClassName } from '../../../util';
import { Contentbox, ContentboxProps } from './Contentbox';
import { Flexbox } from './Flexbox';

export interface CollapsibleProps extends ContentboxProps {
  /**
   * The heading that appears for the Collapsible. It's recommended to always put something here so it's clear
   * what the Collapsible is for when it's collapsed.
   */
  heading?: ReactNode;
  /**
   * (Optional, defaults to {@link HideBehaviour.Remove}) How the Collapsible hides its content when collapsed.
   */
  collapseBehaviour?: HideBehaviour;
  /**
   * Whether the collapsible starts collapsed. This will only apply if the Collapsible is uncontrolled. If you're
   * setting `isCollapsed` to control the Collapsible, just make your initial value for `isCollapsed` the default
   * you want.
   */
  defaultIsCollapsed?: boolean;
  /**
   * Whether the collapsible is currently collapsed. Setting this makes the Collapsible controlled and you
   * must keep this value updated. Use `onChangeCollapsed` to listen for state change requests.
   */
  isCollapsed?: boolean;
  /**
   * What to do when the user indicates they want to change whether the Collapsible is collapsed.
   *
   * @param isCollapsed - Whether the Collapsible should be collapsed.
   */
  onChangeCollapsed?: (isCollapsed: boolean) => void;
}

/**
 * A wrapper that allows its children to be collapsed by clicking on the heading of the
 * Collapsible. To support accessibility, the Collapsible can be controlled by navigating
 * to and activating the chevron button in the heading of the Collapsible.
 *
 * By default, the Collapsible will remove its children from the DOM when the content
 * is collapsed. If you need to retain some state in the children of the Collapsible
 * even when it's collapsed, you can modify the collapse behaviour with the `collapseBehaviour`
 * prop.
 */
export const Collapsible = ({
  className,
  heading,
  collapseBehaviour = HideBehaviour.Remove,
  defaultIsCollapsed,
  isCollapsed,
  onChangeCollapsed,
  children,
  ...otherProps
}: CollapsibleProps) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(
    defaultIsCollapsed ?? false
  );

  const contentId = `jtjs-collapsible-content-${useId()}`;

  const isControlled = isCollapsed !== undefined;

  const getIsCollapsed = () => {
    return isControlled ? isCollapsed : internalIsCollapsed;
  };

  const updateCollapsedState = () => {
    const newState = !getIsCollapsed();

    onChangeCollapsed?.(newState);

    if (!isControlled) {
      setInternalIsCollapsed(newState);
    }
  };

  const removeContent =
    getIsCollapsed() && collapseBehaviour === HideBehaviour.Remove;

  return (
    <Contentbox
      className={buildClassName(className, 'jtjs-collapsible')}
      direction="column"
      {...otherProps}
    >
      <Flexbox
        className="jtjs-collapsible-header"
        style={{
          justifyContent: 'space-between',
          width: '100%',
        }}
        verticalAlignment="center"
        onClick={updateCollapsedState}
      >
        <div className="jtjs-collapsible-heading-container">{heading}</div>

        <button
          data-testid="collapsible-collapse-button"
          className="jtjs-collapsible-collapse-button"
          type="button"
          style={{
            fontFamily: 'monospace',
          }}
          onClick={updateCollapsedState}
          aria-expanded={!getIsCollapsed()}
          aria-controls={contentId}
          aria-label="Toggle collapsible visibility"
        >
          {/* ! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1rem"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </Flexbox>

      {!removeContent && (
        <div
          className="jtjs-collapsible-content"
          style={{
            ...(getIsCollapsed()
              ? {
                  visibility: 'collapse',
                  display: 'none',
                }
              : {
                  visibility: 'visible',
                  display: 'block',
                }),
          }}
          id={contentId}
        >
          {children}
        </div>
      )}
    </Contentbox>
  );
};
