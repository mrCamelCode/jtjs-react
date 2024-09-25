**Disclaimer**: These docs are auto-generated from data produced by
[react-docgen](https://github.com/reactjs/react-docgen). react-docgen
occasionally struggles with some TS syntax. In the cases where the docgen
couldn't correctly discover a type, you'll see `??` in place of the type.
The docgen also isn't great when it comes to displaying unions, function signatures, and arrays.

Arrays will be shown as `Array`. JTJS always types its arrays, so look to your IDE
for more type information on those arrays.

That being said, JTJS is fully typed. If you ever need further details
on something you see in these docs, you can use the hints from your IDE of choice to
get more robust type information.

Separately, these docs currently only include documentation on components.
This library also exports a number of hooks to make your life easier. If you're curious
about those, just look at code completion for function names starting with `use` in your IDE of choice.
    
# Components
- [AcknowledgmentDialog](#acknowledgmentdialog)

- [AsyncButton](#asyncbutton)

- [BaseLabelledInput](#baselabelledinput)

- [Button](#button)

- [Carousel](#carousel)

- [CarouselWithFullView](#carouselwithfullview)

- [Checkbox](#checkbox)

- [Collapsible](#collapsible)

- [ColorInput](#colorinput)

- [ConfirmationDialog](#confirmationdialog)

- [Contentbox](#contentbox)

- [Dialog](#dialog)

- [EmailLink](#emaillink)

- [FileInput](#fileinput)

- [Flexbox](#flexbox)

- [FormDialog](#formdialog)

- [FormGroup](#formgroup)

- [FullImageFileInput](#fullimagefileinput)

- [Grid](#grid)

- [GridArea](#gridarea)

- [Heading](#heading)

- [Icon](#icon)

- [ImageCarouselWithFullView](#imagecarouselwithfullview)

- [ImageFileInput](#imagefileinput)

- [InlineFeedbackMessage](#inlinefeedbackmessage)

- [InlineText](#inlinetext)

- [Input](#input)

- [Label](#label)

- [LabelledCheckbox](#labelledcheckbox)

- [LabelledCheckboxGroup](#labelledcheckboxgroup)

- [LabelledColorInput](#labelledcolorinput)

- [LabelledFileInput](#labelledfileinput)

- [LabelledImageFileInput](#labelledimagefileinput)

- [LabelledInput](#labelledinput)

- [LabelledMaskedMultilineTextInput](#labelledmaskedmultilinetextinput)

- [LabelledMaskedTextInput](#labelledmaskedtextinput)

- [LabelledMultilineTextInput](#labelledmultilinetextinput)

- [LabelledRadio](#labelledradio)

- [LabelledRadioGroup](#labelledradiogroup)

- [LabelledSelect](#labelledselect)

- [LabelledTextInput](#labelledtextinput)

- [LabelledToggle](#labelledtoggle)

- [Link](#link)

- [LoadIndicator](#loadindicator)

- [LoadView](#loadview)

- [MaskedMultilineTextInput](#maskedmultilinetextinput)

- [MaskedTextInput](#maskedtextinput)

- [MultilineTextInput](#multilinetextinput)

- [PhoneLink](#phonelink)

- [Radio](#radio)

- [Select](#select)

- [StructuredDialog](#structureddialog)

- [Table](#table)

- [Text](#text)

- [TextInput](#textinput)

- [ThemeToggle](#themetoggle)

- [Toggle](#toggle)

- [Tooltip](#tooltip)

- [Tooltipped](#tooltipped)
## `AcknowledgmentDialog`
[Components ⬆️](#components)
### Description
A special `StructuredDialog` that provides the user with a button to acknowledge something. In contrast
to a `ConfirmationDialog`, an `AcknowledgmentDialog` doesn't give the user an option to reject the contents
of the dialog. These kinds of dialogs are useful for statements of fact that you want to be sure the user sees.

Some examples of such would be:
1. Legal notices that require acceptance.
1. Making the user aware of necessary cookies your site uses.
1. Warning the user of something on your site, like patterns that may affect those with epilepsy.

The dialog will automatically close if the handler for the action (`onAcknowledge`) evaluates to `true`.
### Props
`acknowledgeButton?: Omit` - The data for the button that represents acknowledging the contents of the dialog. Defaults to
a button with text `Okay` that closes the dialog when clicked. Use `onAcknowledge` to
control what to do when this button is clicked and control whether the dialog should
close when the button is clicked.

Prefer using `onAcknowledge` rather than setting `acknowledgeButton.buttonProps.onClick`, since
that gives you more control over the autoclose operation.


`onAcknowledge?: DialogButton['beforeCloseOnClick']` - What to do when the prompt is acknowledged.




## `AsyncButton`
[Components ⬆️](#components)
### Description
A specialized button that assumes that its `onClick` handler is async and will wait for it to finish. While waiting,
the button is disabled.

While the async task is running, the button will have the `jtjs-async-button-working` class attached to it if you'd
like to assign special styles for that state.
### Props
`enableMouseTracking?: boolean` - (Optional, defaults to `false`) Whether the position of the mouse is tracked when it's over the button.
This can be useful in creating effects with the background of the button that are based on the mouse
position, but could be expensive if you have a lot of other things going on in your app.

If you want to use the mouse position yourself, the current position of the mouse can be tracked in the CSS
as variables scoped to the button. The variables are `--jtjs-mouse-pos-x` and `--jtjs-mouse-pos-y`.


`onChangeMousePosition?: signature` - What to do when the position of the mouse changes while hovering over the button. Only triggered when
`enableMouseTracking` is `true`.

@param mousePosition - The current mouse position, relative to the bounding box of the button. Coordinates of (-1, -1)
imply that the mouse is no longer over the button.


`isPerformingAsyncTask?: boolean = false` - Whether the async button should behave as though it's performing its async task. This will be used in conjunction
with any async `onClick` and the button will show as performing its async task if an `onClick` handler is running
or this is `true`.




## `BaseLabelledInput`
[Components ⬆️](#components)
### Description
The base for a labelled input. It's unlikely you want to use this unless you're
creating your own custom input component. It's more likely that you want to use one
of the more specific and already-created `Labelled...` components.
### Props
`label?: string = ''`


`labelPosition?: LabelPosition = LabelPosition.Before` - What position the label text appears relative to the input.


`labelProps?: LabelProps`


`labelTextProps?: InlineTextProps = {}`


`error?: string`


`warn?: string`


`info?: string`




## `Button`
[Components ⬆️](#components)
### Description
A wrapper for the base button component.

The `type` prop is set to "button" by default, but can be overridden. This is to avoid having buttons
work unexpectedly as submit buttons when you use them in a form.
### Props
`enableMouseTracking?: boolean = false` - (Optional, defaults to `false`) Whether the position of the mouse is tracked when it's over the button.
This can be useful in creating effects with the background of the button that are based on the mouse
position, but could be expensive if you have a lot of other things going on in your app.

If you want to use the mouse position yourself, the current position of the mouse can be tracked in the CSS
as variables scoped to the button. The variables are `--jtjs-mouse-pos-x` and `--jtjs-mouse-pos-y`.


`onChangeMousePosition?: signature` - What to do when the position of the mouse changes while hovering over the button. Only triggered when
`enableMouseTracking` is `true`.

@param mousePosition - The current mouse position, relative to the bounding box of the button. Coordinates of (-1, -1)
imply that the mouse is no longer over the button.




## `Carousel`
[Components ⬆️](#components)
### Description
A generic container for a series of items. The carousel displays the provided
`items` horizontally, rendering according to the `renderItem` prop. By default,
horizontal overflow is handled automatically and the carousel has no wrapping.
If you want to control the maximum width of the carousel, consider passing `style`
or using CSS.

The user may use their mouse (or use keyboard navigation and the Space/Enter keys) to select
items in the carousel. The `onChangeActiveItem` prop may be used to hook into the
active item changing.

This component may be controlled or uncontrolled. Pass something other than `undefined` to
`activeItem` to control the component.

The component resolves to a `Flexbox`, and each item is wrapped in a container
with the class `jtjs-carousel-item-container`. If the item is the currently-selected
item in the carousel, its container will additionally have the `jtjs-carousel-active-item`
class.
### Props
`direction?: union` - (Optional, defaults to `row`) The direction that the contents of the Flexbox
flow.


`reverseDirection?: boolean` - (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
contents should be reversed.


`horizontalAlignment?: union`


`verticalAlignment?: union`


`wrap?: boolean` - (Optional, defaults to `false`) Whether the contents of the Flexbox should
wrap.


`reverseWrap?: boolean`


`spacing?: string` - (Optional, defaults to `0.5rem`) How much space to put between the contents of
the Flexbox.


`items: Array`


`renderItem: signature` - Determines how the item is rendered for the user to see.


`getItemKey: signature` - Determines the key of the item


`activeItem?: union` - The currently active item. Pass if you want to control the component.

`null` can be used when there is no currently active item, but you'd still
like to control the component.


`defaultActiveItem?: T` - The item that's active by default.

This only has an effect when the component
is uncontrolled. If you want to control the component and have a default,
just set `activeItem`'s first value to the desired default.


`onChangeActiveItem?: signature` - Callback for when the user attempts to change the active item.

@param newItem - The item that should now be the active item, or null
if they're clearing the currently active item by selecting the currently
active item again.


`getItemContainerProps?: signature` - A useful iteratee to have finer control over the props that get passed to
the containers that wrap each item in the carousel.

@returns The props for the container that wraps each item in the carousel.


`areItemsEqual?: signature = (item1, item2) => item1 === item2` - (Optional, defaults to a function that determines whether `item1 === item2`)
Allows you to customize how the carousel understands that two items are the same.
This function is how the carousel determines when the active item changes.

This function can be useful if the items in your carousel are complex. For example,
you may want two objects to be equivalent if they have the same ID rather than
checking that they're the same reference.

@param item1
@param item2

@returns Whether the two items are equal.




## `CarouselWithFullView`
[Components ⬆️](#components)
### Description
A variant of the {@link Carousel} that additionally has an area
where the active item displays in a full view.

For example, in the case of an image carousel, you may produce a
small thumbnail image for `renderItem`. For `renderFullView` you
may produce a larger version of the image.

The component resolves to a `Flexbox` that has a container
within it (with the `jtjs-carousel-full-view-area` class). Below that
is a {@link Carousel}.

Because this component is logically a composed extension of a {@link Carousel},
all props go to the underlying carousel. If you want to pass props to the
outermost container, you can use the `containerProps` prop. If you want to pass
props to the container for the full view, you can use the `fullViewAreaProps` prop.
### Props
`direction?: union` - (Optional, defaults to `row`) The direction that the contents of the Flexbox
flow.


`reverseDirection?: boolean` - (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
contents should be reversed.


`horizontalAlignment?: union`


`verticalAlignment?: union`


`wrap?: boolean` - (Optional, defaults to `false`) Whether the contents of the Flexbox should
wrap.


`reverseWrap?: boolean`


`spacing?: string` - (Optional, defaults to `0.5rem`) How much space to put between the contents of
the Flexbox.


`items: Array`


`renderItem: signature` - Determines how the item is rendered for the user to see.


`getItemKey: signature` - Determines the key of the item


`activeItem?: union` - The currently active item. Pass if you want to control the component.

`null` can be used when there is no currently active item, but you'd still
like to control the component.


`defaultActiveItem?: T` - The item that's active by default.

This only has an effect when the component
is uncontrolled. If you want to control the component and have a default,
just set `activeItem`'s first value to the desired default.


`onChangeActiveItem?: signature` - Callback for when the user attempts to change the active item.

@param newItem - The item that should now be the active item, or null
if they're clearing the currently active item by selecting the currently
active item again.


`getItemContainerProps?: signature` - A useful iteratee to have finer control over the props that get passed to
the containers that wrap each item in the carousel.

@returns The props for the container that wraps each item in the carousel.


`areItemsEqual?: signature` - (Optional, defaults to a function that determines whether `item1 === item2`)
Allows you to customize how the carousel understands that two items are the same.
This function is how the carousel determines when the active item changes.

This function can be useful if the items in your carousel are complex. For example,
you may want two objects to be equivalent if they have the same ID rather than
checking that they're the same reference.

@param item1
@param item2

@returns Whether the two items are equal.


`renderFullView: signature`


`renderPlaceholderFullView?: signature` - Allows you to render something when there's no active item. If this
isn't specified, nothing is rendered.

@returns The element to render when there's no active item.


`containerProps?: FlexboxProps = {}`


`fullViewAreaProps?: FlexboxProps = {}`




## `Checkbox`
[Components ⬆️](#components)
### Description
Wraps the base input component with a default `type` of `"checkbox"`.
### Props
`onChangeChecked?: signature` - Handler for when the user attempts to change the value of the checkbox.

@param checked - What the user wants the current checked value to be.
@param event - The original simulated event.




## `Collapsible`
[Components ⬆️](#components)
### Description
A wrapper that allows its children to be collapsed by clicking on the heading of the
Collapsible. To support accessibility, the Collapsible can be controlled by navigating
to and activating the chevron button in the heading of the Collapsible.

By default, the Collapsible will remove its children from the DOM when the content
is collapsed. If you need to retain some state in the children of the Collapsible
even when it's collapsed, you can modify the collapse behaviour with the `collapseBehaviour`
prop.
### Props
`direction?: union` - (Optional, defaults to `row`) The direction that the contents of the Flexbox
flow.


`reverseDirection?: boolean` - (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
contents should be reversed.


`horizontalAlignment?: union`


`verticalAlignment?: union`


`wrap?: boolean` - (Optional, defaults to `false`) Whether the contents of the Flexbox should
wrap.


`reverseWrap?: boolean`


`spacing?: string` - (Optional, defaults to `0.5rem`) How much space to put between the contents of
the Flexbox.


`filled?: boolean` - (Optional, defaults to `false`). Whether the box should have a marker class that indicates it should be filled
(have a background color).


`heading?: ReactNode` - The heading that appears for the Collapsible. It's recommended to always put something here so it's clear
what the Collapsible is for when it's collapsed.


`collapseBehaviour?: HideBehaviour = HideBehaviour.Remove` - (Optional, defaults to {@link HideBehaviour.Remove}) How the Collapsible hides its content when collapsed.


`defaultIsCollapsed?: boolean` - Whether the collapsible starts collapsed. This will only apply if the Collapsible is uncontrolled. If you're
setting `isCollapsed` to control the Collapsible, just make your initial value for `isCollapsed` the default
you want.


`isCollapsed?: boolean` - Whether the collapsible is currently collapsed. Setting this makes the Collapsible controlled and you
must keep this value updated. Use `onChangeCollapsed` to listen for state change requests.


`onChangeCollapsed?: signature` - What to do when the user indicates they want to change whether the Collapsible is collapsed.

@param isCollapsed - Whether the Collapsible should be collapsed.




## `ColorInput`
[Components ⬆️](#components)
### Props
`onChangeColor?: signature` - Handler for when the user changes the color of the input.

@param color - The color, as a hex string. Note that browsers do not support an alpha channel
for the color input.
@param event - The original event.




## `ConfirmationDialog`
[Components ⬆️](#components)
### Description
A special `StructuredDialog` that provides the user with a button to accept or reject a confirmation
of something. This is suitable when you'd like the user to verify they want to perform the action
that triggered the dialog. Usually, it's because the action has consequences that are difficult
or impossible to reverse, or it's a significant operation.

The dialog will automatically close if the handler for the action (`onAccept`/`onReject`) evaluates to `true`.
### Props
`acceptButton?: Omit` - The data for the button that represents accepting the confirmation. Defaults to
a button with text `Okay` that closes the dialog when clicked. Use `onAccept` to
control what to do when this button is clicked and control whether the dialog should
close when the button is clicked.

Prefer using `onAccept` rather than setting `acceptButton.buttonProps.onClick`, since
that gives you more control over the autoclose operation.


`rejectButton?: Omit` - The data for the button that represents rejecting the confirmation. Defaults to
a button with text `Cancel` that closes the dialog when clicked. Use `onReject` to
control what to do when this button is clicked and control whether the dialog should
close when the button is clicked.

Prefer using `onReject` rather than setting `rejectButton.buttonProps.onClick`, since
that gives you more control over the autoclose operation.


`onAccept?: DialogButton['beforeCloseOnClick']` - What to do when the confirmation prompt is accepted.


`onReject?: DialogButton['beforeCloseOnClick']` - What to do when the confirmation prompt is rejected.




## `Contentbox`
[Components ⬆️](#components)
### Description
A simple wrapper meant to house related content.
### Props
`direction?: union` - (Optional, defaults to `row`) The direction that the contents of the Flexbox
flow.


`reverseDirection?: boolean` - (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
contents should be reversed.


`horizontalAlignment?: union`


`verticalAlignment?: union`


`wrap?: boolean` - (Optional, defaults to `false`) Whether the contents of the Flexbox should
wrap.


`reverseWrap?: boolean`


`spacing?: string` - (Optional, defaults to `0.5rem`) How much space to put between the contents of
the Flexbox.


`filled?: boolean = false` - (Optional, defaults to `false`). Whether the box should have a marker class that indicates it should be filled
(have a background color).




## `Dialog`
[Components ⬆️](#components)
### Description
Base component for a dialog, with an option for whether it's a modal. Use the `show` prop to control whether the
dialog is currently visible.

This dialog component gives you the most control over what's in the dialog, but that also means you're responsible
for setting up the structure of the contents of the dialog. If you're looking for a component that handles more of
the common dialog use cases for you, it's recommended to use the other dialog components, like
`ConfirmationDialog` and `AcknowledgmentDialog`. If you want some structure to a custom dialog but don't want to
implement all of that yourself, consider using `StructuredDialog`.

**Note**: The use of dialogs in an application should be minimal. They're generally unfriendly to accessibility and tend
to look bad on mobile. If you're considering using a dialog/modal, you should seriously consider your design
and evaluate whether the use of a dialog/modal is really a requirement. With that said, if you do decide you want this,
JTJS does what it can to make the dialog itself accessible and friendly to the browser.
### Props
`show: boolean` - Whether the dialog should be showing. You should be using this to control when the dialog
is visible, as opposed to conditionally rendering.

@example
```tsx
// DO:
<Dialog show={someShowState} onClose={() => setSomeShowState(false)} />

// DON'T:
{someShowState && (<Dialog />)}
```


`isModal?: boolean = false` - Whether the dialog is a modal. A modal is a dialog that goes on top of the rest of the page in the center of the
screen regardless of where it exists in the DOM. Visually, everything behind the modal is darkened. Elements
behind the modal cannot be interacted with until the modal is closed.


`hideBehaviour?: HideBehaviour = HideBehaviour.Remove` - (Optional, defaults to {@link HideBehaviour.Remove}) How the dialog handles its children when it's not shown. If
{@link HideBehaviour.Hide}, the children of the dialog remain mounted when the dialog is hidden.
If {@link HideBehaviour.Remove}, the children of the dialog will be unmounted when the dialog is hidden.

Consider setting this to {@link HideBehaviour.Hide} if the children of the dialog need to maintain some kind of \
state in between separate showings of the dialog.




## `EmailLink`
[Components ⬆️](#components)
### Description
A link that allows a shortcut to email an address.

If you don't include any children, the link will use the email for its text.
### Props
`external?: boolean` - (Optional, defaults to `false`) Whether the link is external. An external
link will be accompanied by a small icon if using JTJS' styling.

Will also request that the browser open the link in a new tab. This can be
disabled with `disableExternalNewTab`.


`disableExternalNewTab?: boolean` - (Optional, defaults to `false`) Whether the feature of opening links marked
`external` in a new tab should be disabled.


`email: string`




## `FileInput`
[Components ⬆️](#components)
### Description
A wrapper for the base input component with a default `type` of `"file"`. Useful
for when you want to accept a file from the user.

Just like a regular file input, if you'd like to allow the user to pass multiple
files, set the `multiple` prop.

Note that file inputs in HTML are nearly impossible to control. The only valid
value for `value` is an empty string, and that's for wiping the input. The `files`
attribute is intended to be immutable. Because of this, you should treat this input
as uncontrolled. 

If you'd like a more controlled solution, consider using this component as a base to
create a file input that tracks its own state. This is the approach `FullImageFileInput` uses.
### Props
`onChangeFiles?: signature` - Callback for when the user uploads files.

Note that because of how HTML file inputs work, this callback is _not_
additive. That is, if the user uploads 1 file, then uploads 2 files, the
second invocation of this callback will just contain the 2 new files.

@param files - The files the user uploaded.
@param event - The original synthetic event.




## `Flexbox`
[Components ⬆️](#components)
### Description
A wrapper that allows for rapid and simple assembly of layouts by leveraging flex.

Intended to be used purely for layout. Flexboxes aren't intended to have any styling associated with them besides the inline
styles the component generates to express the flex options determined from the provided props.
### Props
`direction?: union = 'row'` - (Optional, defaults to `row`) The direction that the contents of the Flexbox
flow.


`reverseDirection?: boolean = false` - (Optional, defaults to `false`) Whether the flow direction of the Flexbox's
contents should be reversed.


`horizontalAlignment?: union = 'left'`


`verticalAlignment?: union = 'top'`


`wrap?: boolean = true` - (Optional, defaults to `false`) Whether the contents of the Flexbox should
wrap.


`reverseWrap?: boolean = false`


`spacing?: string = '0.5rem'` - (Optional, defaults to `0.5rem`) How much space to put between the contents of
the Flexbox.




## `FormDialog`
[Components ⬆️](#components)
### Description
A special `StructuredDialog` that provides the user with a button to cancel the form and abandon it.
Your application shouldn't save or submit any information in this event.

Because your form would exist within the dialog content you specify and forms are highly implementation-specific,
JTJS doesn't offer a submit button by default with this dialog. This component exists largely for convenience
and making your JSX semantic when you do decide to put a form in a dialog.

It's likely you'll want to close the dialog after the user successfully submits your form.
To do so, keep a `ref` to the `FormDialog` and pass it to the `closeDialog` function.
### Props
`cancelButton?: Omit` - The data for the button that represents cancelling the form. Defaults to
a button with text `Cancel` that closes the dialog when clicked. Use `onCancel` to
control what to do when this button is clicked and control whether the dialog should
close when the button is clicked.

Prefer using `onCancel` rather than setting `cancelButton.buttonProps.onClick`, since
that gives you more control over the autoclose operation.


`onCancel?: DialogButton['beforeCloseOnClick']` - What to do when the form is abandoned.




## `FormGroup`
[Components ⬆️](#components)
### Description
A light wrapper around a `fieldset`. Used to group related form controls and inputs together.
### Props
`inlineItems?: boolean = false` - (Optional, defaults to `false`) Whether the items in the group should be inline.
If this is `false`, each item in the group will be on its own line.


`error?: string`


`warn?: string`


`info?: string`




## `FullImageFileInput`
[Components ⬆️](#components)
### Description
An input intended to gather image files from the user. Unlike other more base components like `ImageFileInput`,
this input is more complex and strives to be a more complete and easy-to-use solution rather than a simple wrapper. The input
resolves to an outer `Flexbox` that contains a `LabelledImageFileInput`, an `ImageCarouselWithFullView`, and a `Button` for
removing uploaded images. Because this component is logically its `LabelledImageFileInput`, its root props reflect that.
You may pass almost anything you could pass to a `LabelledImageFileInput` to this component.
If you pass a `ref` to this component, it will go down to the underlying `input`.
The props for the other items that make up this component are exposed via
other props, like `containerProps` for example.

The input provides a means to upload image files and, unlike a base file input, this input guarantees that it only 
accepts image files. The `File[]` exposed via the `onChangeImageFiles` prop is always guaranteed to only include
files whose type matches `image/*`. 

Image files that are successfully added
are shown in a carousel with full view so the user may peruse what they've uploaded. When looking at the full view
of an uploaded image, the user is provided a button to remove that image from the input.

Via the `multiple` prop, the input may be configured to accept one or several images.
Note that when `multiple` is enabled, the input operates slightly differently than a base file input. Instead
of new uploads clearing any existing uploads, this input will instead _add_ new uploads to what has been uploaded before.

When `multiple` is enabled, the full `ImageCarouselWithFullView` that this component contains is used. All images that
have been uploaded may be browsed and viewed. When `multiple` is _disabled_, the carousel is hidden and the component
always shows the full view of the uploaded image, if there is one. If no image has been uploaded (or the uploaded image
is removed), the default placeholder for `ImageCarouselWithFullView` is displayed.

Unlike a base file input, this input may be controlled. If you'd like to control it, pass something other than `undefined`
to the `value` prop. Controlling the input can be useful for things like initial form values and being able to
wipe the input.

@example ### Accept a single image
```tsx
<FullImageFileInput />
```

@example ### Accept multiple images
```tsx
<FullImageFileInput multiple />
```

@example ### Convert images to WEBP
```tsx
<FullImageFileInput convertImagesTo={ImageConversionType.Webp} />
```

@example ### Control the component and convert incoming uploads to PNG
```tsx
const [pngs, setPngs] = useState<File[]>([]);

<FullImageFileInput
  value={pngs}
  onChangeImageFiles={setPngs}
  convertImagesTo={ImageConversionType.Png}
/>
```
### Props
`value?: Array` - The current value for the input. Can be used to control the input.


`defaultValue?: Array = []` - The default value the input should have.

Note that this only works when the component is uncontrolled. If controlling the component, set a default by
just having the initial `value` be your default.


`onChangeImageFiles?: signature` - Callback for whenever files are uploaded or removed from the input. Unlike a bare `ImageFileInput`,
the files provided are guaranteed to only be images.

@param files - The files tracked by the input. Unlike a bare `ImageFileInput`,
this array is guaranteed to only contain image files. If `multiple` was passed to the
input, this will be _all_ files the input has, not just the most recently uploaded ones.


`containerProps?: FlexboxProps = {}` - Props for the outer container of the input.


`imageCarouselWithFullViewProps?: Omit = {}` - Props for the {@link ImageCarouselWithFullView} the input uses to display previews of the uploaded images.


`removeButtonText?: string = 'Remove'` - (Optional, defaults to `'Remove'`) The text for the button that appears when an image is selected for preview
in the full view carousel.


`removeButtonProps?: Omit = {}`


`labelProps?: ?? = {}`




## `Grid`
[Components ⬆️](#components)
### Description
A component to aid with setting up a gridded layout. Under the hood, this uses CSS [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).
Keep in mind that CSS grid is a _very_ powerful solution with many options and possible uses. This component
doesn't attempt to have a wrapping for every possible use case. Instead, it seeks to make the majority
of use cases easier to set up and require less knowledge of the nitty gritties of grid to accomplish.

The core of this component's behaviour is driven by its `layout` prop, but its other props can also aid
you in establishing a gridded layout efficiently.
### Props
`layout?: union` - Describes the layout of your grid in one of three possible options.

### String Representation
Describes a fixed layout of areas within the grid. If you're completely unfamiliar with grid, it's recommended
you read this short section on [grid-area](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-area)
as a primer. This prop's string representation option is greatly inspired by that CSS rule.

With this option, you define the layout with a template string that looks like a table. Keep in mind that this option
describes your layout as a set of fixed areas, which means your grid won't be responsive. If you need a responsive grid
and you want to use this option, consider using it in conjunction with something like the `useBreakpoint`
hook to swap layouts on-the-fly based on screen size.

The first row of the layout table describes the sizing for the
**columns**. These values can be anything that's a valid size for a grid column or HTML element. You can also leave cells
blank to have the component assume `auto` sizing. This first row for column sizing should have an empty cell at the start of the row.
The empty cell keeps the column sizes in line with the rest of the table. This cell is ignored, so you can leave it blank or
put something like an `X` in it if you prefer.

For defining rows in the layout, you start the row with the sizing for that row. Similarly to the column sizing, this accepts
any valid size for a grid row or HTML element. This cell is the reason the column sizing row has an empty leading cell;
the colum sizing row isn't a real row and therefore doesn't have a need for a row size.

As you define the rest of the row, use the names for grid areas that you'll eventually pass to this `Grid`'s child `GridArea`s.
If a particular cell in the grid will be empty, you can either specify `.` for the name or leave the cell blank. It's recommended
you name your areas after the content they'll contain. Some common examples are `main`, `header`, `footer`, `sidebar`, etc. These
names aren't special and you're free to name your areas whatever you want.

The resulting string should look like a table/grid and give you a very plain and simple representation of how the grid
will be laid out that's verifiable at a glance.

@example
```tsx
<Grid
  layout={`
        | 100px  | 1fr    | 100px
   auto | header | header | header
   1fr  | .      | main   | sidebar
        | footer | footer | footer
  `}
>
   <GridArea name="header" />
   <GridArea name="main" />
   <GridArea name="sidebar" />
   <GridArea name="footer" />
</Grid>
```

That example will yield a grid where there are 3 columns and 3 rows. The first and last columns will have a width of
`100px`. The middle column will have a width of `1fr`. `fr` is a unit for flexible sizes that works to say that the size
should take up a certain amount of the remaining space. You can read more [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout).
Here, we have the middle column taking up all the remaining space that's left after the browser allocates screen space
for the fixed `100px` columns on either side of the middle column.

For our 3 rows, the first row is taken up entirely by an area called `header`. These names can be whatever you want, as long
as they match up with the `GridArea`s you put inside your `Grid`. The first row in the example is sized with `auto`, which
will typically make the row take up no more space than it needs to fit its content. Our second row has an empty area in the
first column (`.` represents an empty grid cell), followed by an area called `main`, and then an area called `sidebar`. This row is allowed to take up any remaining
area not allocated to the other two rows because its size is `1fr`. The final row specifies no size, so `Grid` will assume
`auto`. This row is taken up entirely by an area called `footer`.

This is a rough visualisation of how this layout's rows and columns may look on a screen if we were to outline its rows/columns:
```
       100px         1fr           100px
       ---------------------------------
  auto |   |                       |   |
       |---|-----------------------|---|
       |   |                       |   |
  1fr  |   |                       |   |
       |   |                       |   |
       |---|-----------------------|---|
  auto |   |                       |   |
       ---------------------------------
```

### Array Representation
If you don't like the string representation of the layout, you can also use the array representation. It follows similar
rules and suggestions as the string representation. The only real difference is that for the column sizing row,
you don't need to have an empty first cell.

To get the same layout achieved in the string representation example with the array representation, you'd do:

@example
```tsx
<Grid
   layout={[
     ['100px', '1fr', '100px'], // Column sizing
     ['auto', 'header', 'header', 'header'], // Row 1
     ['1fr', '', 'main', 'sidebar'], // Row 2; the first area could be '.', but blank assumes '.'
     ['', 'footer', 'footer', 'footer'], // Row 3
   ]}
>
   <GridArea name="header" />
   <GridArea name="main" />
   <GridArea name="sidebar" />
   <GridArea name="footer" />
</Grid>
```

### Object Representation
This option allows you to just define your number of rows and columns and their sizes. This option is good
to use when you'd like to rely on the grid's `flow` to automatically decide how to layout its children.
In contrast to the other options, you do _not_ define fixed areas in your layout. This allows the grid to
be responsive by default, but requires more work on your part if you have a preference of general areas within the
grid that you want your `GridArea`s to use.

As a side note, even though you technically forego the definition of areas with this option, it's recommended
(but not required) to still use `GridArea`s as the direct children of the grid to group your content islands.
That also gives you a consistent place (the `GridArea`s) to place any preferences on how certain content islands
span across the available rows/columns. This is made simpler by the `row` and `column` props of `GridArea`.

If you don't want to use `GridArea`s, you can use the `gridRow` and `gridColumn` styles on the direct children of the grid to specify whether
certain children should have fixed slots in the grid.

Regardless of whether you use `GridArea`s or something else as direct children, items will automatically flow in the grid
to attempt to be responsive while obeying the sizing you specify.

To get a similar base layout without fixed areas as the previous two examples, we can do the following:

@example
```tsx
<Grid
   layout={{
     columnSizing: '100px 1fr 100px',
     rowSizing: 'auto 1fr 1fr auto',
   }}
>
   <GridArea row="1" column="1 / span 3" /> // Header
   <GridArea /> // Main
   <GridArea /> // Sidebar
   <GridArea row="3" column="1 / span 3" /> // Footer
</Grid>
```

Note that we're only defining preferences for slots within the grid for our header and footer
and allowing the flow of the grid to determine where to place the content of the middle row. We've also added an additional
row to the middle to give the main content space to move around as needed, giving the final
layout a total of 4 available rows, 2 of which are allocated to the main content space. The top
row is still reserved for the header, and the bottom row is still reserved for the footer.

Keep in mind that this option is minimally parsed, so you'll need to take care that the strings you provide
are well-formed and complete.


`spacing?: string` - Spacing that applies for the spacing between both columns and rows. The more specific `rowSpacing`
and `columnSpacing` props will take precedence.


`rowSpacing?: string` - The space between rows.


`columnSpacing?: string` - The space between columns.


`horizontalAlignment?: union` - Should the grid not take up the entire grid container, you can use
this to align the entire grid horizontally.


`verticalAlignment?: union` - Should the grid not take up the entire grid container, you can use
this to align the entire grid vertically.


`cellHorizontalAlignment?: union` - Aligns grid items within their cell space horizontally.


`cellVerticalAlignment?: union` - Aligns grid items within their cell space vertically.


`flow?: union = 'row'` - (Optional, defaults to `row`) How the children of the grid will automatically flow to fit within the grid's
available cells. This **won't work** if you've specified a fixed `layout`.




## `GridArea`
[Components ⬆️](#components)
### Description
Used in conjunction with `Grid`. Allows you to easily outline the areas of your grid.
### Props
`name?: string` - The name of this grid area. This **_must_** correspond **_exactly_** with the
name you used when defining the parent `Grid`'s `layout`.

Mutually exclusive with `row` and `column`.


`row?: string` - Shorthand for [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row), this allows
you to specify the space you'd like this area to be in when using `flow` in your `Grid`. Note that
specifying this will have no impact if you're using `layout` options in your `Grid` that describe
fixed areas. If using fixed areas, use the `name` prop instead to name this `GridArea` to match the name
you defined in `layout`.

This follows the same syntax as the `grid-row` CSS rule.

Mutually exclusive with `name`.


`column?: string` - Shorthand for [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column), this allows
you to specify the space you'd like this area to be in when using `flow` in your `Grid`. Note that
specifying this will have no impact if you're using `layout` options in your `Grid` that describe
fixed areas. If using fixed areas, use the `name` prop instead to name this `GridArea` to match the name
you defined in `layout`.

This follows the same syntax as the `grid-column` CSS rule.

Mutually exclusive with `name`.




## `Heading`
[Components ⬆️](#components)
### Description
Wraps the base heading elements and uses the appropriate element depending on the `importance` of the Heading.
### Props
`importance?: union = 3` - (Optional, defaults to 3) The importance of the heading. This will be used to determine the appropriate
heading element to use and should generally denote relative importance of the heading on the page.




## `Icon`
[Components ⬆️](#components)
### Description
Renders an icon from FontAwesome. Note that for this component to work, you MUST either:
1. Import FontAwesome via a URL like this: https://use.fontawesome.com/releases/v5.15.4/css/all.css
1. Include FontAwesome in your project yourself another way

If your icon doesn't seem to be appearing and you've verified that you're including FontAwesome
in your project, try verifying and changing the `iconType`.
### Props
`icon: string` - The name of the icon. This must match the name of the icon in FontAwesome, minus the
`fa` prefix (which is added for you).

@example
```tsx
<Icon iconType="solid" icon="address-card" />
```


`iconType?: union = 'solid'` - (Optional, defaults to `'solid'`) The type of icon. This affects the style of the icon pulled from FontAwesome.




## `ImageCarouselWithFullView`
[Components ⬆️](#components)
### Description
A variant of the {@link CarouselWithFullView} intended to display images.

Accepts an array of image props where the `src` is required (and the `alt` is highly recommended)
for its `items`. The `src` should be unique among its siblings; you shouldn't have the same image
included in the carousel more than once, as the `src` is the default for generating
the keys. Should you find yourself in a situation where you must list the same image multiple
times, pass your own `getItemKey` prop to generate unique and stable keys for your
data set.

The component displays small, thumbnail
versions of the images in a carousel. The full view defaults to a larger view
of the image. The placeholder for the full view defaults to a `filled` {@link Contentbox}.

All defaults may be overridden by passing your own props.

Because images are wont to be of many different sizes, `height`
is available as a prop to easily manage controlling the area the image carousel takes
up. The input and carousel will take up 100% of the width they have available.

When an image is in full view, it will be centered in the available
space, as the aspect ratio of the image is respected by default.
This approach prevents the jarring experience of varying sizes of images causing the
page to resize constantly by ensuring the component takes up a consistent size regardless
of the images being viewed.

If you need the carousel to adjust `height` based on the screen size, consider using the
`useBreakpoint` hook.
### Props
`height?: string = '20rem'` - (Optional, defaults to 20rem) Convenience that controls the height of the preview and its container
to make sure the image preview doesn't exceed
a certain height.


`renderItem?: CarouselWithFullViewProps['renderItem']`


`getItemKey?: CarouselWithFullViewProps['getItemKey']`


`renderFullView?: CarouselWithFullViewProps['renderFullView']`


`containerProps?: ?? = {}`




## `ImageFileInput`
[Components ⬆️](#components)
### Description
A light wrapper around a `FileInput` that gives defaults for accepting images.

Because changing image file types is a common use case, this input supports
converting files that come through it. See the `convertImagesTo` prop.

While this component tells the underlying input to only accept images, be aware
that setting what file types are accepted in HTML is more of a suggestion
than something the browser will enforce. Even if an input says it only accepts
images, the user can still provide non-images. You should expect that the files
that come through the input are potentially not images. Setting the accepted file
type is more for improving UX when the OS' file browser window appears. Because
file inputs are nearly impossible to control and this component is intended to be
as close to the native HTML input as possible, this component can't just filter out
non-images.

If you'd like a more complete and opinionated image file input, consider using
`FullImageFileInput`.
### Props
`onChangeFiles?: signature` - Callback for when the user uploads files.

Note that because of how HTML file inputs work, this callback is _not_
additive. That is, if the user uploads 1 file, then uploads 2 files, the
second invocation of this callback will just contain the 2 new files.

@param files - The files the user uploaded.
@param event - The original synthetic event.


`convertImagesTo?: ImageConversionType` - Whether the input should create converted versions of all valid files
passed to it. Conversion is an async process and the input will be
disabled while it's working.

Conversion is useful if your system prefers a particular image file type.
For example, `webp` can be preferable because of how small it is for
the same perceptible visual quality of something like `png`.

Note that file type acceptance in HTML is more of a suggestion than something
the browser enforces. If the user provides a non-image file, the conversion
will just output the file they provided unchanged.

When the conversion is complete, `onChangeFiles` will be invoked with the results
of the conversion.




## `InlineFeedbackMessage`
[Components ⬆️](#components)
### Description
Feedback for the user. Useful in forms and in reaction to user actions.
### Props
`italic?: boolean`


`bold?: boolean`


`messageType: InlineFeedbackMessageType` - The type/severity of the message's contents.




## `InlineText`
[Components ⬆️](#components)
### Props
`italic?: boolean = false`


`bold?: boolean = false`




## `Input`
[Components ⬆️](#components)
### Description
A light wrapper for the `input` element with very little default configuration.
Usually, you won't want to use this directly and would probably prefer using
something like the Checkbox, Radio, or TextInput components.


## `Label`
[Components ⬆️](#components)


## `LabelledCheckbox`
[Components ⬆️](#components)
### Props
`onChangeChecked?: signature` - Handler for when the user attempts to change the value of the checkbox.

@param checked - What the user wants the current checked value to be.
@param event - The original simulated event.


`label?: string`


`labelPosition?: LabelPosition = LabelPosition.After` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledCheckboxGroup`
[Components ⬆️](#components)
### Description
A group of related checkbox inputs.

Can be controlled or uncontrolled. If you intend to control the component, you must provide
a `value` that's not `undefined`.
### Props
`options: Array`


`value?: Array` - The value the group should have. This is an array of all the names of the checkboxes that are currently
checked.


`defaultValue?: Array` - The default value for the checkbox group to have. This only has an effect when the component is uncontrolled. If you
want to default a controlled group, just set your `value`'s initial value to be your default.


`onChangeSelection?: signature` - Handler for when the user attempts to change their selected items in the checkbox group.

@param selectedValues - The names of the checkboxes that should be checked.
@param selectedValue - The name of the checkboxes that was checked.
@param event - The original simulated event.


`labelProps?: ComponentPropsWithoutRef = {}`


`label?: ?? = ''`


`labelPosition?: ?? = LabelPosition.Before`


`labelTextProps?: ?? = {}`




## `LabelledColorInput`
[Components ⬆️](#components)
### Props
`onChangeColor?: signature` - Handler for when the user changes the color of the input.

@param color - The color, as a hex string. Note that browsers do not support an alpha channel
for the color input.
@param event - The original event.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledFileInput`
[Components ⬆️](#components)
### Props
`onChangeFiles?: signature` - Callback for when the user uploads files.

Note that because of how HTML file inputs work, this callback is _not_
additive. That is, if the user uploads 1 file, then uploads 2 files, the
second invocation of this callback will just contain the 2 new files.

@param files - The files the user uploaded.
@param event - The original synthetic event.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledImageFileInput`
[Components ⬆️](#components)
### Props
`onChangeFiles?: signature` - Callback for when the user uploads files.

Note that because of how HTML file inputs work, this callback is _not_
additive. That is, if the user uploads 1 file, then uploads 2 files, the
second invocation of this callback will just contain the 2 new files.

@param files - The files the user uploaded.
@param event - The original synthetic event.


`convertImagesTo?: ImageConversionType` - Whether the input should create converted versions of all valid files
passed to it. Conversion is an async process and the input will be
disabled while it's working.

Conversion is useful if your system prefers a particular image file type.
For example, `webp` can be preferable because of how small it is for
the same perceptible visual quality of something like `png`.

Note that file type acceptance in HTML is more of a suggestion than something
the browser enforces. If the user provides a non-image file, the conversion
will just output the file they provided unchanged.

When the conversion is complete, `onChangeFiles` will be invoked with the results
of the conversion.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledInput`
[Components ⬆️](#components)
### Props
`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledMaskedMultilineTextInput`
[Components ⬆️](#components)
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param treatedText - The input text after going through all the necessary filtering.
This includes applying the mask (if provided) and removing any newlines if the input is not multiline.
@param rawText - The raw input text with no filtering.
@param event - The original simulated event.


`mask?: RegExp` - Mask to apply to the input. The masking is applied using {@link maskText}. Because this component is intended
to allow multiline text, your regex does _not_ need to explicitly allow newlines.

@example
```ts
const onlyNumbersMask = /\d/;
```


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledMaskedTextInput`
[Components ⬆️](#components)
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param treatedText - The input text after going through all the necessary filtering.
This includes applying the mask (if provided) and removing any newlines if the input is not multiline.
@param rawText - The raw input text with no filtering.
@param event - The original simulated event.


`mask?: RegExp` - Mask to apply to the input. The masking is applied using {@link maskText}.

@example
```ts
const onlyNumbersMask = /\d/;
```


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledMultilineTextInput`
[Components ⬆️](#components)
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param text - The text of the input.
@param event - The original simulated event.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledRadio`
[Components ⬆️](#components)
### Props
`onChangeChecked?: signature` - Handler for when the user attempts to change the checked value of this radio button.


`label?: string`


`labelPosition?: LabelPosition = LabelPosition.After` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledRadioGroup`
[Components ⬆️](#components)
### Description
A group of related radio inputs.

Can be controlled or uncontrolled. If you intend to control the component, you must provide
a `value` that's not `undefined`.
### Props
`options: Array`


`name?: string`


`value?: T`


`defaultValue?: T` - The default value for the radio group to have. This only has an effect when the component is uncontrolled. If you
want to default a controlled group, just set your `value`'s initial value to be your default.


`onChangeSelection?: signature` - Handler for when the user attempts to change their selection in the radio group.

@param optionValue - The value of the option that was selected.
@param event - The original simulated event.


`labelProps?: ComponentPropsWithoutRef = {}`


`label?: ?? = ''`


`labelPosition?: ?? = LabelPosition.Before`


`labelTextProps?: ?? = {}`




## `LabelledSelect`
[Components ⬆️](#components)
### Props
`options?: Array` - The options to show in the dropdown.


`onChangeSelection?: signature` - Handler for when the user attempts to change their selection in the dropdown.

@param optionValue - The value of the option that was selected from the dropdown.
@param event - The original simulated event.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledTextInput`
[Components ⬆️](#components)
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param text - The text of the input.
@param event - The original simulated event.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps`


`error?: string`


`warn?: string`


`info?: string`




## `LabelledToggle`
[Components ⬆️](#components)
### Props
`defaultIsOn?: boolean`


`isOn?: boolean` - Whether the toggle is currently on.


`onToggle?: signature` - Handler for when the user tries to change whether the toggle is on.

@param isOn - The state the user is trying to put the toggle in.
@param event - The original simulated event. If the user interaced with the
toggle via a click, this will be a MouseEvent. If the user interacted with
the toggle via the keyboard, this will be a KeyboardEvent.


`disabled?: boolean` - Whether the toggle is disabled.


`label?: string`


`labelPosition?: LabelPosition` - What position the label text appears relative to the input.


`labelProps?: LabelProps = {}`


`labelTextProps?: InlineTextProps = {}`


`error?: string`


`warn?: string`


`info?: string`




## `Link`
[Components ⬆️](#components)
### Props
`external?: boolean = false` - (Optional, defaults to `false`) Whether the link is external. An external
link will be accompanied by a small icon if using JTJS' styling.

Will also request that the browser open the link in a new tab. This can be
disabled with `disableExternalNewTab`.


`disableExternalNewTab?: boolean = false` - (Optional, defaults to `false`) Whether the feature of opening links marked
`external` in a new tab should be disabled.




## `LoadIndicator`
[Components ⬆️](#components)
### Description
Default load indicator. Resolves to `span`s inside a `div` container.

Note that this component has no visual appearance without styling. You must style this element for it
to have any appearance. `@jtjs/theme` includes styles for this element if you don't want to write
your own, or want a base to work from.

If you'd like to style the component yourself, the structure of the resolved markup is:
```
.jtjs-loading-dots-container
 .jtjs-loading-dot.jtjs-loading-dot-1
 .jtjs-loading-dot.jtjs-loading-dot-2
```


## `LoadView`
[Components ⬆️](#components)
### Description
A wrapper that will show its content based on its `isLoading` prop.
### Props
`isLoading: boolean` - Whether the content of the load view is loading. When `true`, the `LoadIndicator` component will be
shown to the user (if no `loadingComponent` is provided). When `false`, the children of the view
will be displayed as-is.


`loadingComponent?: ReactNode = <LoadIndicator />` - (Optional, defaults to `LoadIndicator`) What to show to the user when the view is loading.


`useSimpleLoadIndicator?: boolean = false` - (Optional, defaults to `false`) Whether to use a simple load indicator that's just an {@link InlineText} that says
`Loading...`. This option can be useful if you're not using `@jtjs/theme` since the default {@link LoadIndicator}
used by the `LoadView` has no appearance without styling (be it from `@jtjs/theme` or your own custom styling).

If this is `true`, it will supersede anything passed to `loadingComponent`.

@example
```tsx
// Will display: Loading...
<LoadView useSimpleLoadIndicator isLoading />

// Will display: Loading...
<LoadView useSimpleLoadIndicator loadingComponent={<MyVeryCoolAndIntricateLoadingIndicator />} />

// Will display nothing unless you're either using `@jtjs/theme` or you have your own styling for the LoadIndicator's
// resolved HTML.
<LoadView isLoading />
```




## `MaskedMultilineTextInput`
[Components ⬆️](#components)
### Description
Receives user input in the form of text. Allows masking the input to limit accepted characters.

You can choose whether you control this component, but if you don't control it, the component will
control the underlying input for you. This allows a provided mask to still apply to
the user input.
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param treatedText - The input text after going through all the necessary filtering.
This includes applying the mask (if provided) and removing any newlines if the input is not multiline.
@param rawText - The raw input text with no filtering.
@param event - The original simulated event.


`mask?: RegExp` - Mask to apply to the input. The masking is applied using {@link maskText}. Because this component is intended
to allow multiline text, your regex does _not_ need to explicitly allow newlines.

@example
```ts
const onlyNumbersMask = /\d/;
```




## `MaskedTextInput`
[Components ⬆️](#components)
### Description
Receives user input in the form of text. Allows masking the input to limit accepted characters.

You can choose whether you control this component, but if you don't control it, the component will
control the underlying input for you. This allows a provided mask to still apply to
any input.
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param treatedText - The input text after going through all the necessary filtering.
This includes applying the mask (if provided) and removing any newlines if the input is not multiline.
@param rawText - The raw input text with no filtering.
@param event - The original simulated event.


`mask?: RegExp` - Mask to apply to the input. The masking is applied using {@link maskText}.

@example
```ts
const onlyNumbersMask = /\d/;
```




## `MultilineTextInput`
[Components ⬆️](#components)
### Description
A light wrapper around a `textarea`.
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param text - The text of the input.
@param event - The original simulated event.


`rows?: ?? = 5`




## `PhoneLink`
[Components ⬆️](#components)
### Description
A link that allows a shortcut to call a phone number.

If you don't include any children, the link will use the phone number for its text.
### Props
`external?: boolean` - (Optional, defaults to `false`) Whether the link is external. An external
link will be accompanied by a small icon if using JTJS' styling.

Will also request that the browser open the link in a new tab. This can be
disabled with `disableExternalNewTab`.


`disableExternalNewTab?: boolean` - (Optional, defaults to `false`) Whether the feature of opening links marked
`external` in a new tab should be disabled.


`phoneNumber: string`




## `Radio`
[Components ⬆️](#components)
### Description
A wrapper for the base input component with a default `type` of `"radio"`.
### Props
`onChangeChecked?: signature` - Handler for when the user attempts to change the checked value of this radio button.




## `Select`
[Components ⬆️](#components)
### Description
A wrapper for the native select component. Provides the ability to define the options as a
prop.

Can be controlled or uncontrolled. If you intend to control the component, you must provide
a `value` that's not `undefined`.
### Props
`options?: Array` - The options to show in the dropdown.


`onChangeSelection?: signature` - Handler for when the user attempts to change their selection in the dropdown.

@param optionValue - The value of the option that was selected from the dropdown.
@param event - The original simulated event.




## `StructuredDialog`
[Components ⬆️](#components)
### Description
Base component for a dialog with a standard structure. A structured dialog has, from top to bottom:

1. An optional (though strongly recommended) title. This should describe what the dialog is for.
2. An area for your content.
3. An area for buttons. These buttons could be anything you need. Some examples would be a "Cancel" button to cancel
any actions done in the dialog or an "Okay" button for a confirmation dialog, etc.
### Props
`show: boolean` - Whether the dialog should be showing. You should be using this to control when the dialog
is visible, as opposed to conditionally rendering.

@example
```tsx
// DO:
<Dialog show={someShowState} onClose={() => setSomeShowState(false)} />

// DON'T:
{someShowState && (<Dialog />)}
```


`isModal?: boolean` - Whether the dialog is a modal. A modal is a dialog that goes on top of the rest of the page in the center of the
screen regardless of where it exists in the DOM. Visually, everything behind the modal is darkened. Elements
behind the modal cannot be interacted with until the modal is closed.


`hideBehaviour?: HideBehaviour` - (Optional, defaults to {@link HideBehaviour.Remove}) How the dialog handles its children when it's not shown. If
{@link HideBehaviour.Hide}, the children of the dialog remain mounted when the dialog is hidden.
If {@link HideBehaviour.Remove}, the children of the dialog will be unmounted when the dialog is hidden.

Consider setting this to {@link HideBehaviour.Hide} if the children of the dialog need to maintain some kind of \
state in between separate showings of the dialog.


`title?: string = ''`


`buttons?: Array = []`




## `Table`
[Components ⬆️](#components)
### Description
Provides a simple way to create tables, with the ability to greatly customize
when needed.
### Props
`columnHeaders: Array`


`title?: string` - The title of the table. This should be a descriptive but short name describing
what the table is for.


`rows?: Array` - The rows of the table. If this is provided, then any `children` provided to the Table
are ignored and the Table is auto-generated from the data provided here.


`disableEmptyTag?: boolean = false` - (Optional, defaults to `false`) By default, a short message is shown when the Table doesn't
have any data. The Table has no data when there are no `children` and no `rows`. You can use this
to disable that short message.


`emptyTagText?: string = 'No data available'` - (Optional, defaults to `'No data available'`) The short message that shows when the Table has
no data. Has no effect if `disableEmptyTag` is `true`.


`useVerticalColumnHeaders?: boolean = false`


`maxHeight?: string = ''` - The max height of the Table. When this is set, a scrollbar will automatically be added
to the Table when necessary, and the column headers will become sticky.

@example
```ts
'20rem'
'800px'
```




## `Text`
[Components ⬆️](#components)
### Props
`italic?: boolean = false`


`bold?: boolean = false`




## `TextInput`
[Components ⬆️](#components)
### Description
A wrapper for the base input component with a default `type` of `"text"`. Useful
for single line text input. If you want to allow multiple lines of input, try
using `MultilineTextInput`.
### Props
`onChangeText?: signature` - Handler for when the user attempts to change the input.

@param text - The text of the input.
@param event - The original simulated event.




## `ThemeToggle`
[Components ⬆️](#components)
### Description
A specialty control for toggling between two theme selections (light and dark).

Can be controlled or uncontrolled. If you intend to control the component, you must provide
a `mode` that's not `undefined` and it must be a {@link ThemeMode}.
### Props
`onToggle?: signature`


`mode?: ThemeMode`




## `Toggle`
[Components ⬆️](#components)
### Description
A control that can be interacted with to switch between being on and off.

Can be controlled or uncontrolled. If you intend to control the component, you must provide
a `isOn` that's not `undefined` and it must be a `boolean`.

Note that because a Toggle has no backing element in HTML, you must style this element for it
to have any appearance. `@jtjs/theme` library contains default styling for Toggles you can
use as a base.

If you'd like to style the component yourself, the structure of the resolved markup is:
```
.jtjs-toggle.jtjs-toggle-{on/off}
  .jtjs-toggle-knob
```
### Props
`defaultIsOn?: boolean`


`isOn?: boolean` - Whether the toggle is currently on.


`onToggle?: signature` - Handler for when the user tries to change whether the toggle is on.

@param isOn - The state the user is trying to put the toggle in.
@param event - The original simulated event. If the user interaced with the
toggle via a click, this will be a MouseEvent. If the user interacted with
the toggle via the keyboard, this will be a KeyboardEvent.


`disabled?: boolean` - Whether the toggle is disabled.




## `Tooltip`
[Components ⬆️](#components)
### Description
@private

You shouldn't be using this yourself. If you want to add a tooltip to an
element, wrap it in a `Tooltipped`.
### Props
`italic?: boolean`


`bold?: boolean`




## `Tooltipped`
[Components ⬆️](#components)
### Description
Displays a tooltip when the wrapper is hovered or receives focus. To be accessible,
the guidelines outlined [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
were followed as closely as possible.

This is a wrapper, and you should be aware of what you're wrapping and what the wrapper is in. See
the `inline` prop for more information on possible tweaks you may have to make to avoid invalid markup.
### Props
`tooltip: string` - The text to display for the tooltip.


`inline?: boolean = false` - (Optional, defaults to `false`) Whether the container for the wrapper uses an inline element
(span). This can be used for easy shorthand when you wrap an inline element with a tooltip, or
when this wrapper appears in an element where `div` is not a valid child, since by default
the wrapper is implemented with a `div`.

Note that setting this to `true` changes the wrapper from a `div` to a `span`. If you set this to `true`,
ensure you're wrapping only elements that can exist in a `span`.


`showDelayMs?: number = 500` - (Optional, defaults to `500`) The number of milliseconds that must pass
before the tooltip appears.


`hideDelayMs?: number = 250` - (Optional, defaults to `250`) The number of milliseconds that must pass
before the tooltip disappears. Note, it is recommended that you *DON'T*
make this less than 250. The delay exists partially to allow the user time to hover
over the tooltip to keep it alive. The tooltip remaining visible when
the tooltip itself is hovered is a requirement according to the Mozilla
accessibility guidelines for tooltips.


`disableWrapperFocus?: boolean = false` - (Optional, defaults to `false`) Whether the wrapper for the tooltip can be
focused. You should disable wrapper focus when the element you're giving a
tooltip to can receive focus on its own. Since the inner element can receive
focus, allowing the wrapper to have focus serves no purpose, but it makes
keyboard navigation more difficult.



