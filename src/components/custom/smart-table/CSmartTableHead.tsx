import React, {ElementType, forwardRef, ReactNode, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import {ColumnFilter, ColumnFilterValue, Column, Sorter, SorterValue} from './CSmartTableInterface'

import {CFormInput} from '@coreui/react'
import {CFormCheck} from '@coreui/react'
import {CTableHead, CTableHeadProps} from '../table/CTableHead'
import {CTableHeaderCell} from '../table/CTableHeaderCell'
import {CTableRow} from '../table/CTableRow'

export interface CSmartTableHeadProps extends CTableHeadProps {
  columnFilter?: boolean | ColumnFilter
  columnFilterState?: ColumnFilterValue
  columnSorter?: boolean | Sorter
  component?: string | ElementType
  columns: (Column | string)[]
  handleFilterOnChange?: (key: string, value: string) => void
  handleFilterOnInput?: (key: string, value: string) => void
  handleSelectAllChecked?: () => void
  handleSort?: (key: string, index: number) => void
  selectable?: boolean
  selectAll?: boolean | string
  sorterState?: SorterValue
  sortingIcon?: ReactNode
  sortingIconAscending?: ReactNode
  sortingIconDescending?: ReactNode
}

export const CSmartTableHead = forwardRef<HTMLTableSectionElement, CSmartTableHeadProps>(
  (
    {
      columnFilter,
      columnFilterState,
      columnSorter,
      component: Component = CTableHead,
      columns,
      handleFilterOnChange,
      handleFilterOnInput,
      handleSelectAllChecked,
      handleSort,
      selectable,
      selectAll,
      sorterState,
      sortingIcon,
      sortingIconAscending,
      sortingIconDescending,
      ...rest
    },
    ref,
  ) => {
    const tableHeaderCellProps = (column: Column | string) => {
      if (typeof column === 'object' && column._props) {
        return column._props
      }
      return {}
    }

    const tableHeaderCellStyles = (column: Column | string) => {
      const style = {verticalAlign: 'middle', overflow: 'hidden', cursor: ''}

      if (
        columnSorter &&
        (typeof column !== 'object' ||
          (typeof column === 'object' && (typeof column.sorter === 'undefined' || column.sorter)))
      ) {
        style.cursor = 'pointer'
      }

      if (typeof column === 'object' && column._props) {
        return {...style, ...column._style}
      }
      return style
    }

    const pretifyName = (name: string) => {
      return name
        .replace(/[-_.]/g, ' ')
        .replace(/ +/g, ' ')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const label = (column: Column | string) =>
      typeof column === 'object'
        ? column.label !== undefined
          ? column.label
          : pretifyName(column.key)
        : pretifyName(column)

    const key = (column: Column | string) => (typeof column === 'object' ? column.key : column)

    const getColumnSorterState = (key: string): string | number => {
      if (sorterState && sorterState.column === key) {
        if (sorterState.state) {
          return sorterState.state
        }
        return 0
      }

      return 0
    }

    const columnSorterIcon = (column: Column | string) => {
      if (getColumnSorterState(key(column)) === 0) {
        return <span className='opacity-25 float-end me-1'>{sortingIcon}</span>
      }
      if (getColumnSorterState(key(column)) === 'asc') {
        return <span className='float-end me-1'>{sortingIconAscending}</span>
      }
      if (getColumnSorterState(key(column)) === 'desc') {
        return <span className='float-end me-1'>{sortingIconDescending}</span>
      }

      return <span></span>
    }

    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (selectAll === 'indeterminate') {
        if (checkboxRef.current) checkboxRef.current.indeterminate = true
      } else {
        if (checkboxRef.current) checkboxRef.current.indeterminate = false
      }
    }, [selectAll])

    return (
      <Component {...rest} ref={ref}>
        <CTableRow>
          {selectable && (
            <CTableHeaderCell>
              <CFormCheck
                checked={typeof selectAll === 'boolean' ? selectAll : false}
                onChange={() => handleSelectAllChecked && handleSelectAllChecked()}
                ref={checkboxRef}
              />
            </CTableHeaderCell>
          )}
          {columns.map((column: Column | string, index: number) => {
            return (
              <CTableHeaderCell
                {...tableHeaderCellProps(column)}
                onClick={() => handleSort && handleSort(key(column), index)}
                style={tableHeaderCellStyles(column)}
                key={index}
              >
                <div className='d-inline'>{label(column)}</div>
                {columnSorter &&
                  (typeof column !== 'object' ? true : typeof column.sorter === 'undefined' ? true : column.sorter) &&
                  columnSorterIcon(column)}
              </CTableHeaderCell>
            )
          })}
        </CTableRow>
        {columnFilter && (
          <CTableRow>
            {selectable && <CTableHeaderCell></CTableHeaderCell>}
            {columns.map((column: Column | string, index: number) => {
              return (
                <CTableHeaderCell {...tableHeaderCellProps(column)} key={index}>
                  {(typeof column !== 'object'
                    ? true
                    : typeof column.filter === 'undefined'
                    ? true
                    : column.filter) && (
                    <CFormInput
                      size='sm'
                      onInput={event =>
                        handleFilterOnInput &&
                        handleFilterOnInput(key(column), (event.target as HTMLInputElement).value)
                      }
                      onChange={event =>
                        handleFilterOnChange &&
                        handleFilterOnChange(key(column), (event.target as HTMLInputElement).value)
                      }
                      value={columnFilterState && columnFilterState[key(column)] ? columnFilterState[key(column)] : ''}
                      aria-label={`column name: '${label(column)}' filter input`}
                    />
                  )}
                </CTableHeaderCell>
              )
            })}
          </CTableRow>
        )}
      </Component>
    )
  },
)

CSmartTableHead.propTypes = {
  columnFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  columnFilterState: PropTypes.object,
  columnSorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  component: PropTypes.elementType,
  children: PropTypes.node,
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any, PropTypes.string])).isRequired, // TODO: improve this Prop Type,
  handleFilterOnChange: PropTypes.func,
  handleFilterOnInput: PropTypes.func,
  handleSelectAllChecked: PropTypes.func,
  handleSort: PropTypes.func,
  selectable: PropTypes.bool,
  selectAll: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sorterState: PropTypes.object,
  sortingIcon: PropTypes.node,
  sortingIconAscending: PropTypes.node,
  sortingIconDescending: PropTypes.node,
}

CSmartTableHead.displayName = 'CSmartTableHead'
