import { describe, expect, test } from 'vitest';
import { parseGridLayoutArray, parseGridLayoutString } from '../Grid';

describe('Grid', () => {
  describe('parseGridLayoutString', () => {
    test(`empty whitespace on the beginning/end doesn't impact the result`, () => {
      expect(
        parseGridLayoutString(`

             | auto | 1fr  | auto
        auto |header|header|header
        1fr|sidebar|main|.
        auto|footer|footer|footer


      `)
      ).toEqual([
        ['auto', '1fr', 'auto'],
        ['auto', 'header', 'header', 'header'],
        ['1fr', 'sidebar', 'main', '.'],
        ['auto', 'footer', 'footer', 'footer'],
      ]);

      expect(
        parseGridLayoutString(`
        |auto | 1fr | auto
        auto|header|header|header
        1fr|sidebar|main|.
        auto|footer|footer|footer
      `)
      ).toEqual([
        ['auto', '1fr', 'auto'],
        ['auto', 'header', 'header', 'header'],
        ['1fr', 'sidebar', 'main', '.'],
        ['auto', 'footer', 'footer', 'footer'],
      ]);
    });
    describe('works for...', () => {
      test('one row, one column', () => {
        expect(
          parseGridLayoutString(`
          |auto
          |header
        `)
        ).toEqual([['auto'], ['', 'header']]);
      });
      test('three rows, three columns', () => {
        expect(
          parseGridLayoutString(`
          |auto | 1fr |
          |header|header|header
          1fr|sidebar|main|main
          |footer|footer|footer
        `)
        ).toEqual([
          ['auto', '1fr', ''],
          ['', 'header', 'header', 'header'],
          ['1fr', 'sidebar', 'main', 'main'],
          ['', 'footer', 'footer', 'footer'],
        ]);
      });
      test('two columns, three rows', () => {
        expect(
          parseGridLayoutString(`
          |auto | 1fr
          |header|header
          1fr|sidebar|main
          |footer|footer
        `)
        ).toEqual([
          ['auto', '1fr'],
          ['', 'header', 'header'],
          ['1fr', 'sidebar', 'main'],
          ['', 'footer', 'footer'],
        ]);
      });
      test('three columns, two rows', () => {
        expect(
          parseGridLayoutString(`
          |auto | 1fr |
          |header|header|header
          1fr|sidebar|main|sidebar
        `)
        ).toEqual([
          ['auto', '1fr', ''],
          ['', 'header', 'header', 'header'],
          ['1fr', 'sidebar', 'main', 'sidebar'],
        ]);
      });
    });
    test('ignores the first cell in the column sizing row', () => {
      expect(
        parseGridLayoutString(`
        this is totally ignore and the algorithm doesn't even care my dude. |auto | 1fr | auto
        auto|header|header|header
        1fr|sidebar|main|.
        auto|footer|footer|footer
      `)
      ).toEqual([
        ['auto', '1fr', 'auto'],
        ['auto', 'header', 'header', 'header'],
        ['1fr', 'sidebar', 'main', '.'],
        ['auto', 'footer', 'footer', 'footer'],
      ]);
    });
  });
  describe('parseGridLayoutArray', () => {
    describe('throws when...', () => {
      test("number of columns in a row don't match the number of columns in the sizing array", () => {
        expect(() =>
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main'],
          ])
        ).toThrow();
      });
      test('the array is empty', () => {
        expect(() => parseGridLayoutArray([])).toThrow();
      });
      test('the array only has one element', () => {
        expect(() => parseGridLayoutArray([['auto', '1fr', 'auto']])).toThrow();
      });
    });

    describe('grid-template-areas are correct when...', () => {
      test('all cells are named', () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main', 'main'],
          ]).gridTemplateAreas
        ).toBe(`"header header header" "sidebar main main"`);
      });
      test("there's a blank cell", () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main', ''],
          ]).gridTemplateAreas
        ).toBe(`"header header header" "sidebar main ."`);
      });
      test("there's a cell of whitespace", () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', '     ', 'header'],
            ['1fr', 'sidebar', 'main', 'main'],
          ]).gridTemplateAreas
        ).toBe(`"header . header" "sidebar main main"`);
      });

      test(`there's a cell with '.' in it`, () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', 'header', '.'],
            ['1fr', 'sidebar', 'main', 'sidebar'],
          ]).gridTemplateAreas
        ).toBe(`"header header ." "sidebar main sidebar"`);
      });
    });

    describe('grid-template-columns are correct when...', () => {
      test('all columns have a size', () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['auto', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main', ''],
          ]).gridTemplateColumns
        ).toBe(`auto 1fr auto`);
      });
      test(`there's a blank size`, () => {
        expect(
          parseGridLayoutArray([
            ['', '1fr', ''],
            ['auto', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main', ''],
          ]).gridTemplateColumns
        ).toBe(`auto 1fr auto`);
      });
      test(`there's a size of whitespace`, () => {
        expect(
          parseGridLayoutArray([
            ['     ', '1fr', 'auto'],
            ['auto', 'header', 'header', 'header'],
            ['  ', 'sidebar', 'main', ''],
          ]).gridTemplateColumns
        ).toBe(`auto 1fr auto`);
      });
    });
    describe('grid-template-rows are correct when...', () => {
      test(`all rows have a size`, () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['0.5fr', 'header', 'header', 'header'],
            ['1fr', 'sidebar', 'main', ''],
          ]).gridTemplateRows
        ).toBe(`0.5fr 1fr`);
      });
      test(`there's a blank size`, () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['0.5fr', 'header', 'header', 'header'],
            ['', 'sidebar', 'main', ''],
          ]).gridTemplateRows
        ).toBe(`0.5fr auto`);
      });
      test(`there's a size of whitespace`, () => {
        expect(
          parseGridLayoutArray([
            ['auto', '1fr', 'auto'],
            ['0.5fr', 'header', 'header', 'header'],
            ['   ', 'sidebar', 'main', ''],
          ]).gridTemplateRows
        ).toBe(`0.5fr auto`);
      });
    });
  });
});
