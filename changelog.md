# 3.0.0

## Breaking Changes

- Updated to React 19. If you need help upgrading, check out [React's official upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).
- `Button` no longer has the `enableMouseTracking` nor `onChangeMousePosition` props.
  - These always felt out of place for what's supposed to be a simple wrapper and was the result of a momentary lapse in having a hard separation between `@jtjs/react` and styling.

## New Hooks

- `useFetchedData`
  - Makes it easy to safely use data that you want a component to fetch from some asynchronous data source (like a network call to a server).

# 2.0.0

An exciting update that brings a variety of new components to the library to aid in dealing with file uploads, particularly image uploads!

Most exciting is the `FullImageFileInput`, which gives a robust image file upload interface out of the box. An awesome feature is the ability for its underlying `ImageFileInput` to convert incoming image files to different formats. That means that if your application needs to convert all images to something like `webp` (for better file sizes), the component can do that work for you! The feature is powered by `@jtjs/browser`'s `ImageUtil`.

## Breaking Changes

- Package now only exports to ESM.

## Updates

### New Components

- `Carousel`
- `CarouselWithFullView`
- `FileInput`
- `FullImageFileInput`
- `ImageCarouselWithFullView`
- `ImageFileInput`
- `LabelledFileInput`
- `LabelledImageFileInput`

# 1.7.1

- Correct lack of exports.

# 1.7.0

- Features
  - Added the `PhoneLink` and `EmailLink` components.
  - Added the `Grid` and `GridArea` components.
    - Very exciting addition to JTJS! Grid is a very useful but complex feature of CSS and I've wanted an easy way to interact with it akin to how `Flexbox` lets me interact with CSS flex. These components should simplify many of the common use cases of CSS grid.

# 1.6.0

- Features
  - #5: Added `AsyncButton` component and tweaked `StructuredDialog` to use it as its button implementation.

# 1.5.0

- Bugfixes
  - #3: `exclusive` option for `useChordDown` now works as intended.
- Features
  - #4: Added several Dialog components.
