import { ImageConversionType } from '@jtjs/browser';
import { ThemeService } from '@jtjs/view';
import { SubmitHandler, required, useForm as useModularForm } from '@modular-forms/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Carousel,
  CarouselWithFullView,
  Checkbox,
  Collapsible,
  Contentbox,
  Flexbox,
  FormDialog,
  FormGroup,
  FullImageFileInput,
  Grid,
  GridArea,
  Heading,
  HideBehaviour,
  Icon,
  ImageCarouselItemType,
  ImageCarouselWithFullView,
  InlineFeedbackMessage,
  InlineFeedbackMessageType,
  InlineText,
  LabelPosition,
  LabelledCheckboxGroup,
  LabelledColorInput,
  LabelledImageFileInput,
  LabelledInput,
  LabelledRadio,
  LabelledRadioGroup,
  LabelledSelect,
  LabelledTextInput,
  LabelledToggle,
  Link,
  LoadView,
  Radio,
  Select,
  StructuredDialog,
  Table,
  Text,
  ThemeMode,
  ThemeToggle,
  Toggle,
  Tooltipped,
  closeDialog,
  useBreakpoint,
  useTheme,
} from '../lib';

function fakeNetworkCall(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(3), 5000);
  });
}

ThemeService.registerTheme({
  ...ThemeService.dark,
  name: 'dark',
});
ThemeService.registerTheme({
  ...ThemeService.parchment,
  name: 'light',
});

// UserActivityService.onActivity.subscribe(() => console.log('activity'));
// UserActivityService.onChangeActivityState.subscribe((state) => {
//   console.log('activity state changin to:', ActivityState[state].toString());
// });

type ModularFormData = {
  username: string;
  password: string;
};

export const App = () => {
  const [theme, setTheme] = useTheme();
  const [data, setData] = useState(0);
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [toggle, setToggle] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(theme.background);
  const [showDialog, setShowDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [fullImageFiles, setFullImageFiles] = useState<File[]>([]);

  const [testImages, setTestImages] = useState<ImageCarouselItemType[]>([]);

  const currentBreakpoint = useBreakpoint();

  const modularFormDialog = useRef<HTMLDialogElement>(null);

  console.log('render');

  const { register, handleSubmit } = useForm<{
    name: string;
    otherName: string;
    anotherName: string;
  }>();

  useEffect(() => {
    const loadImages = async () => {
      const images: ImageCarouselItemType[] = (
        await Promise.all(new Array(10).fill(0).map((_, index) => import(`./assets/images/${index}.png`)))
      ).map((imp: any) => ({
        src: imp.default,
      }));

      setTestImages(images);
    };

    loadImages();
  }, []);

  useEffect(() => {
    fakeNetworkCall().then((num) => setData(num));
  }, []);

  useEffect(() => {
    ThemeService.updateTheme(theme.name, {
      background: backgroundColor,
    });
  }, [backgroundColor]);

  const themeColors: { name: string; color: string }[] = Object.entries(theme)
    .map(([colorName, hex]) => {
      return {
        name: colorName,
        color: hex,
      };
    })
    .filter((c) => c.name !== 'name');

  const onSubmit = (data: any) => console.log(data);

  const handleModularFormSubmit: SubmitHandler<ModularFormData> = (values) => {
    console.log('subimtted with values:', values);

    closeDialog(modularFormDialog.current);
  };

  useEffect(() => {
    console.log('full iamge files:', fullImageFiles);
  }, [fullImageFiles]);

  return (
    <Flexbox className="width_full" spacing="1rem" direction="column">
      <Collapsible className="width_full" direction="column" heading="General" defaultIsCollapsed>
        <Flexbox className="width_full" direction="column">
          <Button onClick={() => setShowDialog(true)}>Open Dialog</Button>
          <StructuredDialog
            // title="My Dialog"
            show={showDialog}
            isModal
            onClose={() => setShowDialog(false)}
          >
            <InlineText>I'm text in a dialog!</InlineText>

            <LabelledTextInput label="Input in Dialog" autoFocus />
          </StructuredDialog>

          <Button onClick={() => setShowFormDialog(true)}>Open Form Dialog</Button>
          <FormDialog
            ref={modularFormDialog}
            show={showFormDialog}
            title="Form Dialog"
            isModal
            onCancel={() => new Promise((resolve) => setTimeout(() => resolve(true), 3000))}
            onClose={() => setShowFormDialog(false)}
          >
            <ModularFormTest handleSubmit={handleModularFormSubmit} />
          </FormDialog>

          <FormGroup>
            <LabelledTextInput label="Something" />
            <LabelledTextInput label="Something Else" />
          </FormGroup>

          <FormGroup error="Bad news!" warn="Better news!" info="Good news!">
            <LabelledTextInput label="Something" />
            <LabelledTextInput label="Something Else" />
          </FormGroup>

          <InlineText
            style={{
              maxWidth: 200,
              maxHeight: '2rem',
              overflow: 'auto',
              wordBreak: 'keep-all',
              whiteSpace: 'nowrap',
            }}
          >
            something really long that will definitely cause a scrollbar I mean cmon look at this runon sentence it's
            just neverending okay I'll stop now because this is probably enough.
          </InlineText>

          <FormGroup error="Bad news!" warn="Better news!" info="Good news!" inlineItems>
            <LabelledTextInput label="Something" />
            <LabelledTextInput label="Something Else" />
          </FormGroup>

          <Text>Current breakpoint is: {currentBreakpoint}</Text>

          <Radio checked={radio} onChangeChecked={setRadio} />

          <Checkbox checked={checked} onChangeChecked={setChecked} />

          <LabelledRadioGroup
            label="Favorite Monster"
            options={[
              {
                label: 'Kraken',
                value: 'K',
                props: {
                  labelPosition: LabelPosition.Before,
                },
              },
              {
                label: 'Sasquatch',
                value: 'S',
              },
              {
                label: 'Mothman',
                value: 'M',
              },
            ]}
            error="Bad news!"
            warn="Better news!"
            info="Good news!"
          />

          <LabelledRadioGroup
            inlineItems
            label="Favorite Monster Inline"
            options={[
              {
                label: 'Kraken',
                value: 'K',
                props: {
                  labelPosition: LabelPosition.Before,
                },
              },
              {
                label: 'Sasquatch',
                value: 'S',
              },
              {
                label: 'Mothman',
                value: 'M',
              },
              {
                label: 'Cthulhu',
                value: 'C',
              },
              {
                label: 'Werewolf',
                value: 'W',
              },
              {
                label: 'Vampire',
                value: 'V',
              },
            ]}
          />

          <LabelledCheckboxGroup
            label="Cool Games"
            options={[
              {
                label: 'Fallout',
                name: 'fo',
              },
              {
                label: 'The Elder Scrolls',
                name: 'tes',
              },
              {
                label: 'FFXIV',
                name: 'ffxiv',
                props: {
                  labelPosition: LabelPosition.Before,
                },
              },
              {
                label: "Baldur's Gate 3",
                name: 'bg3',
              },
            ]}
            error="Bad news!"
            warn="Better news!"
            info="Good news!"
          />

          <LabelledCheckboxGroup
            inlineItems
            label="Cool Games Inline"
            options={[
              {
                label: 'Fallout',
                name: 'fo',
              },
              {
                label: 'The Elder Scrolls',
                name: 'tes',
              },
              {
                label: 'FFXIV',
                name: 'ffxiv',
                props: {
                  labelPosition: LabelPosition.Before,
                },
              },
              {
                label: "Baldur's Gate 3",
                name: 'bg3',
              },
            ]}
          />

          <LabelledRadio disabled label="Labelled Radio" />

          <Toggle isOn={toggle} onToggle={setToggle} />

          <Toggle />

          <LabelledToggle label="Labelled Toggle" />

          <LabelledToggle label="Labelled Toggle" labelPosition={LabelPosition.After} />

          <LabelledToggle label="Disabled Labelled Toggle" disabled />
          <Toggle disabled />

          <Tooltipped tooltip="Toggle App Theme" disableWrapperFocus>
            <ThemeToggle
              mode={theme.name === 'light' ? ThemeMode.Light : ThemeMode.Dark}
              onToggle={(mode) => (mode === ThemeMode.Light ? setTheme('light') : setTheme('dark'))}
            />
          </Tooltipped>

          <Select
            value={selectedOption}
            options={[
              {
                label: 'Kraken',
                value: 'K',
              },
              {
                label: 'Sasquatch',
                value: 'S',
              },
              {
                label: 'Mothman',
                value: 'M',
              },
            ]}
            onChangeSelection={setSelectedOption}
          />

          <LabelledSelect
            label="Subscription Tier"
            options={[
              {
                groupLabel: 'Totally Awesomesauce',
                options: [
                  {
                    label: 'Richest Elitest',
                    value: 0,
                  },
                  {
                    label: 'Richer Eliter',
                    value: 1,
                  },
                  {
                    label: 'Rich Elite',
                    value: 2,
                  },
                ],
              },
              {
                groupLabel: 'Okay',
                options: [
                  {
                    label: 'A Fair Amount of Dough',
                    value: 3,
                  },
                  {
                    label: 'An Okay Amount of Dough',
                    value: 4,
                  },
                ],
              },
              {
                label: "You're Such a Schlub, You Don't Get an Option Group",
                value: 5,
              },
            ]}
          />
          <LabelledSelect
            label="Subscription Tier"
            labelPosition={LabelPosition.After}
            options={[
              {
                groupLabel: 'Totally Awesomesauce',
                options: [
                  {
                    label: 'Richest Elitest',
                    value: 0,
                  },
                  {
                    label: 'Richer Eliter',
                    value: 1,
                  },
                  {
                    label: 'Rich Elite',
                    value: 2,
                  },
                ],
              },
              {
                groupLabel: 'Okay',
                options: [
                  {
                    label: 'A Fair Amount of Dough',
                    value: 3,
                  },
                  {
                    label: 'An Okay Amount of Dough',
                    value: 4,
                  },
                ],
              },
              {
                label: "You're Such a Schlub, You Don't Get an Option Group",
                value: 5,
              },
            ]}
          />

          <Button>Click Me!</Button>
          <Button enableMouseTracking>Another Button</Button>
          <Button disabled>Can't Click Me!</Button>

          <Collapsible heading="Collapsible Heading" collapseBehaviour={HideBehaviour.Hide}>
            <Text>I can be collapsed!</Text>

            <Button>Focusable Button</Button>
          </Collapsible>

          <Collapsible defaultIsCollapsed heading="Tables">
            <Table title="Empty Table" columnHeaders={['Data Col 1', 'Data Col 2']} />

            <Table
              title="Example Table"
              columnHeaders={[
                'Name',
                'Age',
                {
                  header: 'Profession',
                  headerProps: {
                    onClick: () => console.log('click!'),
                    style: {
                      cursor: 'pointer',
                    },
                  },
                },
                'Input',
              ]}
              rows={new Array(20).fill(0).map(() => ({
                cells: ['JT', 26, 'Software Dev', <LabelledTextInput label="Something" />],
              }))}
            />

            <Table
              title="Example Table With Capped Height"
              columnHeaders={['Name', 'Age', 'Profession', 'Input']}
              rows={new Array(20).fill(0).map(() => ({
                cells: ['JT', 26, 'Software Dev', <LabelledTextInput label="Something" />],
              }))}
              maxHeight="15rem"
            />
          </Collapsible>

          {/* <Contentbox filled>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flexbox direction="column">
              <LabelledMaskedTextInput
                label="RHF: Name (A-Z only)"
                mask={/[a-z]/i}
                {...register('name')}
              />

              <LabelledMaskedMultilineTextInput
                label="RHF: Multline Name (no numbers)"
                labelPosition={LabelPosition.After}
                mask={/[^\d]/}
                {...register('otherName')}
              />

              <input type="text" {...register('anotherName')} />

              <Button type="submit">Submit</Button>
            </Flexbox>
          </form>
        </Contentbox> */}

          <LabelledInput label="Password" type="password" />
          <LabelledInput label="Numbers" type="number" />

          <LabelledTextInput label="Labelled Text Input" error="Problem!" />
          <LabelledTextInput
            label="Bottom Label Error"
            labelPosition={LabelPosition.After}
            error="This is a longer error message that's probably too long."
          />

          <LabelledTextInput label="Labelled Text Input" warn="Warning!" />
          <LabelledTextInput label="Labelled Text Input" info="Information!" />

          <InlineFeedbackMessage messageType={InlineFeedbackMessageType.Error}>Standalone error!</InlineFeedbackMessage>

          <InlineFeedbackMessage messageType={InlineFeedbackMessageType.Warn}>Standalone warn!</InlineFeedbackMessage>

          <InlineFeedbackMessage messageType={InlineFeedbackMessageType.Info}>Standalone info!</InlineFeedbackMessage>

          <div
            style={{
              height: '100px',
              width: '100px',
              backgroundColor: ThemeService.darken(ThemeService.currentTheme.foreground, 0.5),
            }}
          ></div>
          <Link href="https://google.com">Google</Link>
          <Link external href="https://google.com">
            Google as External
          </Link>
          <Icon icon="address-card" iconType="solid" />
          <Tooltipped tooltip="Totally neat extra information that's really long and just keeps going like wow who would write a tooltip this long I have no idea!">
            <Text>I have a tooltip!</Text>
          </Tooltipped>

          <Text>
            Here's some text that has a{' '}
            <Tooltipped tooltip="Hey look, an inline tooltip" inline>
              TOOLTIP!
            </Tooltipped>{' '}
            inside it inline.
          </Text>

          <LoadView isLoading />

          <LoadView isLoading useSimpleLoadIndicator />

          <Flexbox>
            <LabelledColorInput label="Background Color" value={theme.background} onChangeColor={setBackgroundColor} />

            <LabelledColorInput label="Some Color" defaultValue="#00ffff" labelPosition={LabelPosition.After} />
          </Flexbox>

          <Heading importance={3}>Colors</Heading>
          <Flexbox direction="column">
            {themeColors.map((themeColor) => {
              const ThemeColorSample = ({ themeColor }: { themeColor: { color: string; name: string } }) => {
                return (
                  <Flexbox
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    style={{
                      height: '2rem',
                      width: '6rem',
                      backgroundColor: themeColor.color,
                    }}
                    key={themeColor.name}
                  >
                    <span
                      style={{
                        textShadow: '1px 1px black',
                        color: 'white',
                      }}
                    >
                      {themeColor.name}
                    </span>
                  </Flexbox>
                );
              };

              return (
                <Flexbox spacing="0" key={themeColor.name}>
                  <ThemeColorSample
                    key={`${themeColor.name}-2`}
                    themeColor={{
                      name: `${themeColor.name}-lightened`,
                      color: ThemeService.lighten(themeColor.color),
                    }}
                  />
                  <ThemeColorSample key={`${themeColor.name}-1`} themeColor={themeColor} />
                  <ThemeColorSample
                    key={`${themeColor.name}-3`}
                    themeColor={{
                      name: `${themeColor.name}-darkened`,
                      color: ThemeService.darken(themeColor.color),
                    }}
                  />
                </Flexbox>
              );
            })}
          </Flexbox>
        </Flexbox>
      </Collapsible>

      <Collapsible className="width_full" direction="column" heading="Grid" defaultIsCollapsed>
        <Heading importance={1}>Grid</Heading>

        <Heading importance={2}>Standard</Heading>
        <Grid
          layout={`
                | 100px  | 1fr    | 100px
           auto | header | header | header
           1fr  | .      | main   | sidebar
                | footer | footer | footer
        `}
          style={{
            width: '100%',
          }}
        >
          <GridArea name="header">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'red',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Header</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="main">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'blue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Main</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="sidebar">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'lightblue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Sidebar</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="footer">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'green',
              }}
            >
              <Text style={{ color: 'white' }}>Footer</Text>
            </Flexbox>
          </GridArea>
        </Grid>

        <Heading importance={2}>Areas Span Rows</Heading>
        <Grid
          layout={`
                | 1fr    | 1fr    | auto
           auto | header | header | sidebar
           1fr  | main   | main   | sidebar
                | footer | footer | sidebar
        `}
          style={{
            width: '100%',
          }}
        >
          <GridArea name="header">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'red',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Header</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="main">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'blue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Main</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="sidebar">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'lightblue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Sidebar</Text>
            </Flexbox>
          </GridArea>

          <GridArea name="footer">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Footer</Text>
            </Flexbox>
          </GridArea>
        </Grid>

        <Heading importance={2}>Responsive</Heading>
        <Grid
          layout={{
            columnSizing: '100px 1fr 100px',
            rowSizing: 'auto 1fr 1fr auto',
          }}
          style={{
            width: '100%',
          }}
        >
          <GridArea row="1" column="1 / span 3">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'red',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Header</Text>
            </Flexbox>
          </GridArea>

          <GridArea>
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'blue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Main</Text>
            </Flexbox>
          </GridArea>

          <GridArea>
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'lightblue',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Sidebar</Text>
            </Flexbox>
          </GridArea>

          <GridArea row="3" column="1 / span 3">
            <Flexbox
              horizontalAlignment="center"
              verticalAlignment="center"
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ color: 'white' }}>Footer</Text>
            </Flexbox>
          </GridArea>
        </Grid>
      </Collapsible>

      <Collapsible className="width_full" direction="column" heading="Carousel" defaultIsCollapsed>
        <Heading importance={2}>Carousel</Heading>

        <Carousel
          items={new Array(100).fill(0).map((_el, index) => `item ${index + 1}`)}
          getItemKey={(item) => item}
          renderItem={(item) => (
            <Contentbox>
              <InlineText>{item}</InlineText>
            </Contentbox>
          )}
          onChangeActiveItem={(item) => console.log('new active item:', item)}
        />

        <Heading importance={2}>Carousel With Full View</Heading>

        <CarouselWithFullView
          items={['test 1', 'test 2', 'test 3']}
          getItemKey={(item) => item}
          renderItem={(item) => <InlineText>{item}</InlineText>}
          renderFullView={(item) => <Heading importance={3}>{item}</Heading>}
          onChangeActiveItem={(item) => console.log('new active item for full view:', item)}
        />

        <Heading importance={2}>Image Carousel</Heading>

        <Flexbox className="width_full" horizontalAlignment="center">
          <ImageCarouselWithFullView items={testImages} />
        </Flexbox>
      </Collapsible>

      <Collapsible className="width_full" direction="column" heading="Image File Input" defaultIsCollapsed>
        <Heading importance={2}>Image Input</Heading>

        <LabelledImageFileInput
          label="Image Upload"
          onChangeFiles={setImageFiles}
          convertImagesTo={ImageConversionType.Webp}
          multiple
        />

        <Text>Files:</Text>
        {imageFiles.map((file) => (
          <Text key={file.name}>{file.name}</Text>
        ))}

        <Heading importance={2}>Full Image Input</Heading>

        <Button onClick={() => setFullImageFiles([])}>Clear Full Image File Input</Button>

        <Flexbox horizontalAlignment="center">
          <FullImageFileInput
            containerProps={{
              style: {
                width: '50rem',
              },
            }}
            value={fullImageFiles}
            convertImagesTo={ImageConversionType.Webp}
            onChangeImageFiles={setFullImageFiles}
            multiple
          />
        </Flexbox>

        <Heading importance={2}>Full Image Input with Custom Placeholder</Heading>

        <Flexbox horizontalAlignment="center">
          <FullImageFileInput
            containerProps={{
              style: {
                width: '50rem',
              },
            }}
            convertImagesTo={ImageConversionType.Webp}
            imageCarouselWithFullViewProps={{
              renderPlaceholderFullView: () => {
                return (
                  <Contentbox
                    className="width_full"
                    filled
                    style={{
                      height: '20rem',
                    }}
                    verticalAlignment="center"
                    horizontalAlignment="center"
                  >
                    <Icon
                      icon="image"
                      style={{
                        fontSize: '3rem',
                        opacity: 0.5,
                      }}
                    />
                  </Contentbox>
                );
              },
            }}
            // multiple
          />
        </Flexbox>
      </Collapsible>
    </Flexbox>
  );
};

const ModularFormTest = ({ handleSubmit }: { handleSubmit: SubmitHandler<ModularFormData> }) => {
  const [modularForm, { Field, Form }] = useModularForm<ModularFormData>();

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="username" validate={[required('req')]}>
        {(field, props) => <LabelledTextInput {...props} label="Username" error={field.error.value} required />}
      </Field>

      <Field name="password" validate={[required('req')]}>
        {(field, props) => <LabelledTextInput {...props} label="Password" error={field.error.value} required />}
      </Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
};
