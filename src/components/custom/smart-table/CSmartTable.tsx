import React, {ChangeEvent, forwardRef, useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types'

import {cilArrowBottom, cilArrowTop, cilSwapVertical} from '@coreui/icons'

import {ColumnFilterValue, CSmartTableProps, Item, ItemInternal, SorterValue} from './CSmartTableInterface'

import {CSmartPagination} from '../pagination/CSmartPagination'
import {CElementCover} from '../element-cover/CElementCover'

import {CTable} from '../table/CTable'
import {CTableFoot} from '../table/CTableFoot'

import {CSmartTableBody} from './CSmartTableBody'
import {CSmartTableCleaner} from './CSmartTableCleaner'
import {CSmartTableFilter} from './CSmartTableFilter'
import {CSmartTableHead} from './CSmartTableHead'
import {CSmartTableItemsPerPageSelector} from './CSmartTableItemsPerPageSelector'

import CIcon from '@coreui/icons-react'

export const CSmartTable = forwardRef<HTMLDivElement, CSmartTableProps>(
  (
    {
      activePage = 1,
      cleaner,
      clickableRows,
      columnFilter,
      columnFilterValue, // TODO: consider to use only columnFilter prop
      columns,
      columnSorter,
      footer,
      header = true,
      items,
      itemsPerPage = 10,
      itemsPerPageLabel = 'Items per page:',
      itemsPerPageOptions = [5, 10, 20, 50],
      itemsPerPageSelect,
      loading,
      noItemsLabel = 'No items found',
      onActivePageChange,
      onColumnFilterChange,
      onFilteredItemsChange,
      onItemsPerPageChange,
      onRowClick,
      onSelectedItemsChange,
      onSorterChange,
      onTableFilterChange,
      pagination,
      paginationProps,
      scopedColumns,
      selectable,
      sorterValue,
      sortingIcon = <CIcon width={18} icon={cilSwapVertical} key='csv' />,
      sortingIconAscending = <CIcon width={18} icon={cilArrowTop} key='cat' />,
      sortingIconDescending = <CIcon width={18} icon={cilArrowBottom} key='cab' />,
      tableBodyProps,
      tableFootProps,
      tableFilter,
      tableFilterLabel = 'Filter:',
      tableFilterPlaceholder = 'type string...',
      tableFilterValue, // TODO: consider to use only tableFilter prop
      tableHeadProps,
      tableProps,
      ...rest
    },
    ref,
  ) => {
    // instance data
    const [_activePage, setActivePage] = useState<number>(activePage)
    const [_items, setItems] = useState<ItemInternal[]>([])
    const [_itemsPerPage, setItemsPerPage] = useState(itemsPerPage)
    const [columnFilterState, setColumnFilterState] = useState<ColumnFilterValue>({})
    const [selectedAll, setSelectedAll] = useState<boolean | string>()
    const [sorterState, setSorterState] = useState<SorterValue>({})
    const [tableFilterState, setTableFilterState] = useState<string>(tableFilterValue ? tableFilterValue : '')

    // watch
    useMemo(() => {
      if (items && items.length < _itemsPerPage * _activePage - _itemsPerPage) {
        setActivePage(1)
      }

      // Create the internal array of items
      Array.isArray(items) &&
        setItems(
          items?.map((item: Item, index: number) => {
            return {...item, _id: index}
          }),
        )
    }, [JSON.stringify(items)])

    useMemo(() => {
      columnFilterValue && setColumnFilterState(columnFilterValue)
    }, [JSON.stringify(columnFilterValue)])

    useMemo(() => {
      setSorterState({...sorterValue})
    }, [JSON.stringify(sorterValue)])

    useMemo(() => setItemsPerPage(itemsPerPage), [itemsPerPage])

    // functions

    const isSortable = (i: number): boolean | undefined => {
      const isDataColumn = itemsDataColumns.includes(rawColumnNames[i])
      let column
      if (columns) column = columns[i]
      return (
        columnSorter &&
        (!columns ||
          typeof column !== 'object' ||
          (typeof column === 'object' && (typeof column.sorter === 'undefined' || column.sorter))) &&
        isDataColumn
      )
    }

    const sorterChange = (column: string, index: number): void => {
      if (!isSortable(index)) {
        return
      }
      //if column changed or sort was descending change asc to true
      const state = sorterState ? sorterState : {column: '', state: ''}

      if (state.column === column) {
        if (state.state === 0) {
          state.state = 'asc'
        } else if (state.state === 'asc') {
          state.state = 'desc'
        } else {
          if (typeof columnSorter === 'object' && !columnSorter.resetable) {
            state.state = 'asc'
          } else {
            state.state = 0
          }
        }
      } else {
        state.column = column
        state.state = 'asc'
      }
      setSorterState({...state})
    }

    const itemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>): void => {
      if (
        typeof itemsPerPageSelect !== 'object' ||
        (typeof itemsPerPageSelect === 'object' && !itemsPerPageSelect.external)
      )
        setItemsPerPage(Number((event.target as HTMLSelectElement).value))
    }

    const columnFilterChange = (colName: string, value: string, type: string): void => {
      const isLazy = columnFilter && typeof columnFilter === 'object' && columnFilter.lazy === true
      if ((isLazy && type === 'input') || (!isLazy && type === 'change')) {
        return
      }
      const newState = {...columnFilterState, [`${colName}`]: value}
      setActivePage(1)
      setColumnFilterState(newState)
    }

    const tableFilterChange = (value: string, type: string): void => {
      const isLazy = tableFilter && typeof tableFilter === 'object' && tableFilter.lazy === true
      if ((isLazy && type === 'input') || (!isLazy && type === 'change')) {
        return
      }
      setActivePage(1)
      setTableFilterState(value)
    }

    const clean = (): void => {
      setTableFilterState('')
      setColumnFilterState({})
      setSorterState({})
    }

    // computed

    const genCols = Object.keys(_items[0] || {}).filter(el => el.charAt(0) !== '_')
    const rawColumnNames = columns
      ? columns.map((column: any) => {
          if (typeof column === 'object') return column.key
          else return column
        })
      : genCols //! || el
    const itemsDataColumns = rawColumnNames.filter(name => genCols.includes(name))

    // variables
    const filteredColumns: ItemInternal[] = useMemo(() => {
      let items = _items
      if (columnFilter && typeof columnFilter === 'object' && columnFilter.external) {
        return items
      }
      Object.entries(columnFilterState).forEach(([key, value]) => {
        const columnFilter = String(value).toLowerCase()
        if (columnFilter && itemsDataColumns.includes(key)) {
          items = items.filter(item => {
            return String(item[key]).toLowerCase().includes(columnFilter)
          })
        }
      })
      return items
    }, [JSON.stringify(columnFilterState), JSON.stringify(_items)])

    const filteredTable: ItemInternal[] = useMemo(() => {
      let items = filteredColumns
      if (!tableFilterState || (tableFilter && typeof tableFilter === 'object' && tableFilter.external)) {
        return items
      }
      const filter = tableFilterState.toLowerCase()
      const valueContainFilter = (val: any) => String(val).toLowerCase().includes(filter)
      items = items.filter(item => {
        return !!itemsDataColumns.find(key => valueContainFilter(item[key]))
      })
      return items
    }, [tableFilterState, JSON.stringify(tableFilterValue), JSON.stringify(filteredColumns)])

    const sortedItems: ItemInternal[] = useMemo(() => {
      const col = sorterState?.column
      if (
        !col ||
        !itemsDataColumns.includes(col) ||
        (columnSorter && typeof columnSorter === 'object' && columnSorter.external)
      ) {
        return filteredTable
      }

      const flip = sorterState.state === 'asc' ? 1 : sorterState.state === 'desc' ? -1 : 0
      const sorted = filteredTable.slice().sort((item, item2) => {
        const value = item[col]
        const value2 = item2[col]
        const a = typeof value === 'number' ? value : String(value).toLowerCase()
        const b = typeof value2 === 'number' ? value2 : String(value2).toLowerCase()
        return a > b ? 1 * flip : b > a ? -1 * flip : 0
      })
      return sorted
    }, [
      JSON.stringify(filteredTable),
      JSON.stringify(sorterState),
      JSON.stringify(columnSorter),
      JSON.stringify(filteredColumns),
      JSON.stringify(_items),
    ])

    const numberOfPages: number = _itemsPerPage ? Math.ceil(sortedItems.length / _itemsPerPage) : 1

    const firstItemOnActivePageIndex: number = _activePage ? (_activePage - 1) * _itemsPerPage : 0

    const itemsOnActivePage: ItemInternal[] = sortedItems.slice(
      firstItemOnActivePageIndex,
      firstItemOnActivePageIndex + _itemsPerPage,
    )

    const currentItems: ItemInternal[] = _activePage ? itemsOnActivePage : sortedItems

    const isFiltered: string = tableFilterState || sorterState?.column || Object.values(columnFilterState).join('')

    // effects

    useEffect(() => {
      onActivePageChange && onActivePageChange(_activePage)
    }, [_activePage])

    useEffect(() => {
      onItemsPerPageChange && onItemsPerPageChange(_itemsPerPage)
      itemsPerPage !== _itemsPerPage && setActivePage(1) // TODO: set proper page after _itemsPerPage update
    }, [_itemsPerPage])

    useEffect(() => {
      sorterState && onSorterChange && onSorterChange(sorterState)
    }, [JSON.stringify(sorterState)])

    useEffect(() => {
      onColumnFilterChange && onColumnFilterChange(columnFilterState)
    }, [JSON.stringify(columnFilterState)])

    useEffect(() => {
      onTableFilterChange && onTableFilterChange(tableFilterState)
    }, [tableFilterState])

    useEffect(() => {
      onFilteredItemsChange && onFilteredItemsChange(sortedItems)
    }, [JSON.stringify(sortedItems)])

    const handleRowChecked = (id: number, value: boolean) => {
      const newArr = [..._items]
      newArr[id]._selected = value
      setItems(newArr)
    }

    const handleSelectAllChecked = () => {
      if (selectedAll === true) {
        setItems(
          _items.map((item: ItemInternal) => {
            return {...item, _selected: false}
          }),
        )
        return
      }

      setItems(
        _items.map((item: ItemInternal) => {
          return {...item, _selected: true}
        }),
      )
    }

    useEffect(() => {
      if (selectable) {
        const selected = _items.filter(item => item._selected === true)
        onSelectedItemsChange && onSelectedItemsChange(selected)

        if (selected.length === _items.length) {
          setSelectedAll(true)
          return
        }

        if (selected.length === 0) {
          setSelectedAll(false)
          return
        }

        if (selected.length !== 0 && selected.length !== _items.length) {
          setSelectedAll('indeterminate')
        }
      }
    }, [_items])

    return (
      <React.Fragment>
        <div {...rest} ref={ref}>
          {(itemsPerPageSelect || tableFilter || cleaner) && (
            <div className='row my-2 mx-0'>
              {(tableFilter || cleaner) && (
                <>
                  <div className='col-auto p-0'>
                    {tableFilter && (
                      <CSmartTableFilter
                        filterLabel={tableFilterLabel}
                        filterPlaceholder={tableFilterPlaceholder}
                        onInput={e => {
                          tableFilterChange((e.target as HTMLInputElement).value, 'input')
                        }}
                        onChange={e => {
                          tableFilterChange((e.target as HTMLInputElement).value, 'change')
                        }}
                        value={tableFilterState || ''}
                      />
                    )}
                  </div>
                  <div className='col-auto p-0'>
                    {cleaner && (
                      <CSmartTableCleaner
                        isFiltered={isFiltered}
                        onClick={() => clean()}
                        onKeyUp={event => {
                          if (event.key === 'Enter') clean()
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className='position-relative'>
          <CTable {...tableProps}>
            {header && (
              <CSmartTableHead
                {...tableHeadProps}
                columnFilter={columnFilter}
                columnFilterState={columnFilterState}
                columns={columns ? columns : rawColumnNames}
                columnSorter={columnSorter}
                selectable={selectable}
                selectAll={selectedAll}
                sorterState={sorterState}
                sortingIcon={sortingIcon}
                sortingIconAscending={sortingIconAscending}
                sortingIconDescending={sortingIconDescending}
                handleSort={(key, index) => sorterChange(key, index)}
                handleFilterOnChange={(key, event) => columnFilterChange(key, event, 'change')}
                handleFilterOnInput={(key, event) => columnFilterChange(key, event, 'input')}
                handleSelectAllChecked={() => handleSelectAllChecked()}
              />
            )}
            <CSmartTableBody
              currentItems={currentItems}
              firstItemOnActivePageIndex={firstItemOnActivePageIndex}
              noItemsLabel={noItemsLabel}
              onRowClick={(item, index, columnName, event) =>
                clickableRows && onRowClick && onRowClick(item, index, columnName, event)
              }
              onRowChecked={(id, value) => handleRowChecked(id, value)}
              rawColumnNames={rawColumnNames}
              scopedColumns={scopedColumns}
              selectable={selectable}
              {...tableBodyProps}
            />
            {footer && (
              <CSmartTableHead
                component={CTableFoot}
                {...tableFootProps}
                columnFilter={false}
                columnSorter={false}
                columns={columns ? columns : rawColumnNames}
                handleSelectAllChecked={() => handleSelectAllChecked()}
                selectable={selectable}
                selectAll={selectedAll}
              />
            )}
          </CTable>
          {loading && (
            <CElementCover
              boundaries={[
                {sides: ['top'], query: 'td'},
                {sides: ['bottom'], query: 'tbody'},
              ]}
            />
          )}
        </div>

        {(pagination || itemsPerPageSelect) && (
          <div className='row'>
            <div className='col'>
              {pagination && numberOfPages > 1 && (
                <CSmartPagination
                  {...paginationProps}
                  onActivePageChange={page => {
                    setActivePage(page)
                  }}
                  pages={numberOfPages}
                  activePage={_activePage}
                />
              )}
            </div>
            <div className='col-auto ms-auto'>
              {itemsPerPageSelect && (
                <CSmartTableItemsPerPageSelector
                  itemsPerPage={_itemsPerPage}
                  itemsPerPageLabel={itemsPerPageLabel}
                  itemsPerPageOptions={itemsPerPageOptions}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => itemsPerPageChange(event)}
                />
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  },
)

CSmartTable.propTypes = {
  activePage: PropTypes.number,
  cleaner: PropTypes.bool,
  clickableRows: PropTypes.bool,
  columnFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  columnFilterValue: PropTypes.object,
  columns: PropTypes.array,
  columnSorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  footer: PropTypes.bool,
  header: PropTypes.bool,
  items: PropTypes.array,
  itemsPerPage: PropTypes.number,
  itemsPerPageLabel: PropTypes.string,
  itemsPerPageOptions: PropTypes.array,
  itemsPerPageSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool,
  noItemsLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onActivePageChange: PropTypes.func,
  onColumnFilterChange: PropTypes.func,
  onFilteredItemsChange: PropTypes.func,
  onItemsPerPageChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectedItemsChange: PropTypes.func,
  onSorterChange: PropTypes.func,
  onTableFilterChange: PropTypes.func,
  pagination: PropTypes.bool,
  paginationProps: PropTypes.any, // TODO: update
  scopedColumns: PropTypes.object,
  selectable: PropTypes.bool,
  sorterValue: PropTypes.object,
  sortingIcon: PropTypes.node,
  sortingIconAscending: PropTypes.node,
  sortingIconDescending: PropTypes.node,
  tableBodyProps: PropTypes.object,
  tableFootProps: PropTypes.object,
  tableFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tableFilterLabel: PropTypes.string,
  tableFilterPlaceholder: PropTypes.string,
  tableFilterValue: PropTypes.string,
  tableHeadProps: PropTypes.object,
  tableProps: PropTypes.object,
}

CSmartTable.displayName = 'CSmartTable'
