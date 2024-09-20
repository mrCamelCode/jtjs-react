import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
} from 'react';
import { buildClassName } from '../../util';
import { Text } from '../text';

export interface TableCell {
  id: string;
  content: ReactNode;
}

export interface ComplexTableColumnHeader {
  header: ReactNode;
  headerProps?: ComponentPropsWithoutRef<'th'>;
}

export type TableColumnHeader = ReactNode | ComplexTableColumnHeader;

export interface TableRow {
  cells: ReactNode[];
  tableRowProps?: ComponentPropsWithoutRef<'tr'>;
  tableCellProps?: ComponentPropsWithoutRef<'td'>;
}

export interface TableProps
  extends Omit<ComponentPropsWithRef<'table'>, 'rows' | 'headers'> {
  columnHeaders: TableColumnHeader[];
  /**
   * The title of the table. This should be a descriptive but short name describing
   * what the table is for.
   */
  title?: string;
  /**
   * The rows of the table. If this is provided, then any `children` provided to the Table
   * are ignored and the Table is auto-generated from the data provided here.
   */
  rows?: TableRow[];
  /**
   * (Optional, defaults to `false`) By default, a short message is shown when the Table doesn't
   * have any data. The Table has no data when there are no `children` and no `rows`. You can use this
   * to disable that short message.
   */
  disableEmptyTag?: boolean;
  /**
   * (Optional, defaults to `'No data available'`) The short message that shows when the Table has
   * no data. Has no effect if `disableEmptyTag` is `true`.
   */
  emptyTagText?: string;
  useVerticalColumnHeaders?: boolean;
  /**
   * The max height of the Table. When this is set, a scrollbar will automatically be added
   * to the Table when necessary, and the column headers will become sticky.
   *
   * @example
   * ```ts
   * '20rem'
   * '800px'
   * ```
   */
  maxHeight?: string;
}

/**
 * Provides a simple way to create tables, with the ability to greatly customize
 * when needed.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      style,
      title,
      rows,
      columnHeaders: headers,
      children,
      disableEmptyTag = false,
      emptyTagText = 'No data available',
      useVerticalColumnHeaders: useVerticalHeaders = false,
      maxHeight = '',
      ...otherProps
    }: TableProps,
    ref
  ) => {
    const generateTableFromRowData = () => {
      if (!rows) {
        return null;
      }

      return (
        <>
          {rows.map((row, rowIndex) => {
            const { cells } = row;

            if (cells.length !== headers.length) {
              console.error(
                `Table: Row with index ${rowIndex} has ${cells.length} cells, but there are ${headers.length} columns.`
              );

              return null;
            }

            return (
              <tr key={rowIndex} {...row.tableRowProps}>
                {cells.map((cellData, cellIndex) => {
                  return (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      {...row.tableCellProps}
                    >
                      {cellData}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      );
    };

    let tableContents: ReactNode = null;
    if (rows && rows.length > 0) {
      tableContents = generateTableFromRowData();
    } else if (children) {
      tableContents = children;
    } else if (!disableEmptyTag) {
      tableContents = (
        <tr>
          <td colSpan={headers.length}>
            <Text
              className="jtjs-empty-table-tag"
              style={{
                opacity: 0.8,
                textAlign: 'center',
              }}
              italic
            >
              {emptyTagText}
            </Text>
          </td>
        </tr>
      );
    }

    return (
      <table
        className={buildClassName(className, 'jtjs-table')}
        style={{
          ...(maxHeight
            ? {
                maxHeight,
                display: 'block',
                overflowY: 'auto',
                borderCollapse: 'separate',
              }
            : {}),
          ...style,
        }}
        cellSpacing="0"
        {...otherProps}
        ref={ref}
      >
        <caption>{title}</caption>

        <thead
          style={{
            ...(maxHeight
              ? {
                  position: 'sticky',
                  zIndex: 1,
                  top: 0,
                }
              : {}),
          }}
        >
          <tr>
            {headers.map((columnHeader, index) => {
              const isComplexHeader =
                typeof columnHeader === 'object' && columnHeader !== null
                  ? 'header' in columnHeader
                  : false;

              const {
                header,
                headerProps: {
                  style: tableHeaderStyle,
                  ...otherHeaderProps
                } = {},
              } = isComplexHeader
                ? (columnHeader as ComplexTableColumnHeader)
                : ({
                    header: columnHeader as ReactNode,
                  } as ComplexTableColumnHeader);

              return (
                <th
                  key={typeof columnHeader === 'string' ? columnHeader : index}
                  style={{
                    ...tableHeaderStyle,
                    ...(useVerticalHeaders
                      ? {
                          writingMode: 'vertical-rl',
                        }
                      : {}),
                  }}
                  {...otherHeaderProps}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>{tableContents}</tbody>
      </table>
    );
  }
);
