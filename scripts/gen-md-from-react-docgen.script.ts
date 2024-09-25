/**
 * Creates a markdown document from the output react-docgen.
 *
 * Requires Deno to run.
 */

import { exists } from 'https://deno.land/std@0.91.0/fs/mod.ts';
import { Documentation } from 'npm:react-docgen';
import { PropDescriptor } from 'npm:react-docgen/dist/Documentation';

type Section = string[];
type Sections = Section[];

main();

async function main() {
  try {
    const { reactDocGenOutputFilePath, outputFilePath } = parseArguments();

    const md = await getMarkdown(reactDocGenOutputFilePath);

    await Deno.writeFile(`${outputFilePath}.md`, new TextEncoder().encode(md));
  } catch (error) {
    console.error(`Failed to generate MD from docs: ${error}`);

    Deno.exit(-1);
  }
}

function parseArguments(): {
  reactDocGenOutputFilePath: string;
  outputFilePath: string;
} {
  const [reactDocGenOutputFilePath, outputFilePath] = Deno.args;

  if (!reactDocGenOutputFilePath) {
    throw new Error(
      'No react-docgen output file path was provided. Call the script with the first argument specifying the path to the output file of react-docgen.'
    );
  }

  if (!outputFilePath) {
    throw new Error(
      'No output path was specified. Call the script with the second argument specifying the name of the MD file that will be output.'
    );
  }

  return {
    reactDocGenOutputFilePath,
    outputFilePath,
  };
}

async function getMarkdown(reactDocGenOutputFilePath: string): Promise<string> {
  const docSections = parseDocumentationToSections(await getDocumentation(reactDocGenOutputFilePath)).sort(
    compareSectionsAlphabetically
  );

  return [
    `**Disclaimer**: These docs are auto-generated from data produced by
[react-docgen](https://github.com/reactjs/react-docgen). react-docgen
occasionally struggles with some TS syntax. In the cases where the docgen
couldn't correctly discover a type, you'll see \`??\` in place of the type.
The docgen also isn't great when it comes to displaying unions, function signatures, and arrays.

Arrays will be shown as \`Array\`. JTJS always types its arrays, so look to your IDE
for more type information on those arrays.

That being said, JTJS is fully typed. If you ever need further details
on something you see in these docs, you can use the hints from your IDE of choice to
get more robust type information.

Separately, these docs currently only include documentation on components.
This library also exports a number of hooks to make your life easier. If you're curious
about those, just look at code completion for function names starting with \`use\` in your IDE of choice.
    `,
    '\n',
    getTableOfContentsLines(docSections).join('\n'),
    docSections.map(addTableOfContentsLinkToSection).flat().join('\n'),
  ].join('');
}

async function getDocumentation(reactDocGenOutputFilePath: string): Promise<Documentation[]> {
  if (!(await exists(reactDocGenOutputFilePath))) {
    throw new Error(
      `The file for the react-docgen output file at path: "${reactDocGenOutputFilePath}" does not exist.`
    );
  }

  try {
    const reactDocGenOutput = new TextDecoder().decode(await Deno.readFile(reactDocGenOutputFilePath));

    return Object.values(JSON.parse(reactDocGenOutput)).flat() as Documentation[];
  } catch (error) {
    throw new Error(`Could not parse the react-docgen output file: ${error}`);
  }
}

function parseDocumentationToSections(docs: Documentation[]): Sections {
  const parseDocToLines = (doc: Documentation): string[] => {
    const { displayName, description, props } = doc;

    const propsLines = parsePropsToLines(props ?? {});

    return [
      `## \`${displayName}\``,
      description ? ['### Description', description].join('\n') : '',
      propsLines.length > 0 ? ['### Props', propsLines.join('\n')].join('\n') : '',
      '\n',
    ].filter(Boolean);
  };

  const linesSections = docs.map(parseDocToLines);

  return linesSections;
}

function parsePropsToLines(props: PropDescriptor): string[] {
  return Object.entries(props ?? {})
    .map(([propName, propDetails]) => {
      const {
        required,
        defaultValue: { value: defaultValueString = '' } = {},
        tsType: { name: typeName = '' } = {},
        description,
      } = propDetails;

      return [
        [
          '`',
          propName,
          !required ? '?' : '',
          ':',
          ' ',
          typeName || '??',
          defaultValueString ? ` = ${defaultValueString}` : '',
          '`',
          description ? [' - ', description].join('') : '',
        ].join(''),
        '\n',
      ].filter(Boolean);
    })
    .flat();
}

function getSectionNames(sections: Sections): string[] {
  return sections.map((section) => {
    return treatSectionHeader(section[0]);
  });
}

function getTableOfContentsLines(sections: Sections): string[] {
  return [
    '# Components',
    ...getSectionNames(sections).map((sectionName) => `- [${sectionName}](#${sectionName.toLowerCase()})\n`),
  ];
}

function addTableOfContentsLinkToSection(section: Section): Section {
  const [sectionHeader, ...restOfSection] = section;

  const link = '[Components ⬆️](#components)';

  return [sectionHeader, link, ...restOfSection];
}

function compareSectionsAlphabetically(sectionA: Section, sectionB: Section): -1 | 0 | 1 {
  const [sectionAHeader] = sectionA;
  const [sectionBHeader] = sectionB;

  const treatedSectionAHeader = treatSectionHeader(sectionAHeader);
  const treatedSectionBheader = treatSectionHeader(sectionBHeader);

  if (treatedSectionAHeader < treatedSectionBheader) {
    return -1;
  } else if (treatedSectionAHeader > treatedSectionBheader) {
    return 1;
  }

  return 0;
}

function treatSectionHeader(str: string): string {
  return str.replace(/[#`]/g, '').trim();
}
