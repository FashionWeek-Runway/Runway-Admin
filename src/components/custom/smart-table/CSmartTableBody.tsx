import React, {forwardRef, MouseEvent, ReactNode} from 'react'
import PropTypes from 'prop-types'

import {CTableBody, CTableBodyProps} from '../table/CTableBody'
import {CTableRow} from '../table/CTableRow'
import {CTableDataCell} from '../table/CTableDataCell'

import {CFormCheck} from '@coreui/react'

import {Item, ItemInternal, ScopedColumns} from './CSmartTableInterface'

export interface CSmartTableBodyProps extends CTableBodyProps {
  clickableRows?: boolean
  currentItems: ItemInternal[]
  firstItemOnActivePageIndex: number
  noItemsLabel?: string | ReactNode
  onRowChecked?: (id: number, value: boolean) => void
  onRowClick?: (item: ItemInternal, index: number, columnName: string, event: MouseEvent | boolean) => void
  rawColumnNames: string[]
  scopedColumns?: ScopedColumns
  selectable?: boolean
}

export const CSmartTableBody = forwardRef<HTMLTableSectionElement, CSmartTableBodyProps>(
  (
    {
      clickableRows,
      currentItems,
      firstItemOnActivePageIndex,
      noItemsLabel,
      onRowChecked,
      onRowClick,
      rawColumnNames,
      scopedColumns,
      selectable,
      ...rest
    },
    ref,
  ) => {
    const tableDataCellProps = (item: Item, colName: string) => {
      const props = item._cellProps && {
        ...(item._cellProps['all'] && {...item._cellProps['all']}),
        ...(item._cellProps[colName] && {...item._cellProps[colName]}),
      }

      return props
    }

    const getColumnName = (event: MouseEvent): string => {
      const target = event.target as HTMLTextAreaElement
      const closest = target.closest('tr')
      const children = closest ? Array.from(closest.children) : []
      const clickedCell = children.filter(child => child.contains(target))[0]
      return rawColumnNames[children.indexOf(clickedCell)]
    }

    const colspan: number = selectable ? rawColumnNames.length + 1 : rawColumnNames.length

    return (
      <CTableBody
        {...(clickableRows && {
          style: {cursor: 'pointer'},
        })}
        {...rest}
        ref={ref}
      >
        {currentItems.map((item: ItemInternal, trIndex) => {
          return (
            <React.Fragment key={trIndex}>
              <CTableRow
                {...(item._props && {...item._props})}
                {...(clickableRows && {tabIndex: 0})}
                onClick={event =>
                  onRowClick && onRowClick(item, trIndex + firstItemOnActivePageIndex, getColumnName(event), event)
                }
              >
                {selectable && (
                  <CTableDataCell>
                    <CFormCheck
                      checked={item._selected ? item._selected : false}
                      onChange={event => onRowChecked && onRowChecked(item._id, event.target.checked)}
                    />
                  </CTableDataCell>
                )}
                {rawColumnNames.map((colName, index) => {
                  return (
                    (scopedColumns &&
                      scopedColumns[colName] &&
                      React.cloneElement(scopedColumns[colName](item, trIndex + firstItemOnActivePageIndex), {
                        key: index,
                      })) || (
                      <CTableDataCell {...tableDataCellProps(item, colName)} key={index}>
                        {String(item[colName])}
                      </CTableDataCell>
                    )
                  )
                })}
              </CTableRow>
              {scopedColumns && scopedColumns.details && (
                <>
                  <CTableRow>
                    <CTableDataCell
                      colSpan={colspan}
                      className='p-0'
                      style={{borderBottomWidth: 0}}
                      tabIndex={-1}
                    ></CTableDataCell>
                  </CTableRow>
                  <CTableRow
                    onClick={event =>
                      onRowClick && onRowClick(item, trIndex + firstItemOnActivePageIndex, getColumnName(event), true)
                    }
                    className='p-0'
                    key={`details${trIndex}`}
                  >
                    <CTableDataCell colSpan={colspan} className='p-0' style={{border: 0}}>
                      {scopedColumns.details(item, trIndex + firstItemOnActivePageIndex)}
                    </CTableDataCell>
                  </CTableRow>
                </>
              )}
            </React.Fragment>
          )
        })}
        {!currentItems.length && (
          <CTableRow>
            <CTableDataCell colSpan={colspan}>{noItemsLabel}</CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    )
  },
)

CSmartTableBody.propTypes = {
  clickableRows: PropTypes.bool,
  currentItems: PropTypes.array.isRequired,
  firstItemOnActivePageIndex: PropTypes.number.isRequired,
  noItemsLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onRowChecked: PropTypes.func,
  onRowClick: PropTypes.func,
  rawColumnNames: PropTypes.array.isRequired,
  scopedColumns: PropTypes.object,
  selectable: PropTypes.bool,
}

CSmartTableBody.displayName = 'CSmartTableBody'
