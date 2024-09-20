import { cleanup, render, screen } from '@testing-library/react';
import { Table, TableProps } from '../Table';
import { afterEach, describe, expect, test, vi } from 'vitest';

const renderTable = (props: Partial<TableProps> = {}) => {
  const defaultProps: TableProps = {
    columnHeaders: ['Column 1', 'Column 2', 'Column 3'],
  };

  return render(<Table {...defaultProps} {...props} />);
};

describe('Table', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('headers show', () => {
    renderTable();

    ['Column 1', 'Column 2', 'Column 3'].forEach((header) => {
      expect(screen.queryByText(header)).not.toBeNull();
    });
  });

  test('rows of plain text show up', () => {
    const cellTexts = ['text', 'other text', 'some more text'];

    renderTable({
      rows: [
        {
          cells: cellTexts,
        },
      ],
    });

    cellTexts.forEach((cellText) => {
      expect(screen.queryByText(cellText)).not.toBeNull();
    });
  });

  test('cells can contain JSX', () => {
    renderTable({
      rows: [
        {
          cells: ['jfkdaf', <span>This is a test</span>, 'jfkdajfa'],
        },
      ],
    });

    expect(screen.queryByText('This is a test')).not.toBeNull();
  });

  test('table uses children if provided', () => {
    renderTable({
      children: (
        <>
          <tr>
            <td>Custom one</td>
            <td></td>
            <td></td>
          </tr>
        </>
      ),
    });

    expect(screen.queryByText('Custom one')).not.toBeNull();
  });

  describe('header customization', () => {
    describe('simple', () => {
      test('plain strings can be passed to the column headers', () => {
        renderTable({
          columnHeaders: ['Column Test'],
        });

        expect(screen.queryByText('Column Test')).not.toBeNull();
      });
      test('a node can be passed', () => {
        renderTable({
          columnHeaders: [<span>Column Test</span>],
        });

        expect(screen.queryByText('Column Test')).not.toBeNull();
      });
    });
    describe('complex', () => {
      test('the passed "header" appears', () => {
        renderTable({
          columnHeaders: [
            {
              header: 'Column Test',
            },
          ],
        });

        expect(screen.queryByText('Column Test')).not.toBeNull();
      });
      test('extra props can be passed', () => {
        const { container } = renderTable({
          columnHeaders: [
            {
              header: 'Column Test',
              headerProps: {
                'aria-label': 'test!',
                className: 'test-class',
              },
            },
          ],
        });

        expect(container.querySelector("[aria-label='test!']")).not.toBeNull();
        expect(container.querySelector('.test-class')).not.toBeNull();
      });
    });

    test('can mix complex and simple headers', () => {
      renderTable({
        columnHeaders: [
          'Column Test 1',
          {
            header: 'Column Test 2',
          },
        ],
      });

      expect(screen.queryByText('Column Test 1')).not.toBeNull();
      expect(screen.queryByText('Column Test 2')).not.toBeNull();
    });
  });

  describe('empty tag', () => {
    test('shows when table is empty', () => {
      renderTable();

      expect(screen.queryByText('No data available')).not.toBeNull();
    });

    test("doesn't show when disabled", () => {
      renderTable({
        disableEmptyTag: true,
      });

      expect(screen.queryByText('No data available')).toBeNull();
    });

    test('uses custom text', () => {
      renderTable({
        emptyTagText: 'Nothin here, man!',
      });

      expect(screen.queryByText('No data available')).toBeNull();
      expect(screen.queryByText('Nothin here, man!')).not.toBeNull();
    });
  });
});
