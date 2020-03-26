import React from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { TableSortLabel, TextField, TableFooter, TablePagination } from '@material-ui/core';
import MaterialUiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SearchIcon from '@material-ui/icons/Search'

const columnFilter = ({ column: { filterValue, setFilter }, }) => (
    <TextField
        size='small'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        InputProps={{ startAdornment: <SearchIcon fontSize='small' color='disabled' /> }} />  
)

export default function Table(props) {
    const defaultColumn = React.useMemo(() => ({ Filter: columnFilter }), [])

    const {  
        getTableProps,
        headers,
        headerGroups,
        rows,
        prepareRow,
        page,
        state: { pageIndex, pageSize },
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns: props.columns,  data: props.data, defaultColumn
        },
        useFilters,
        useSortBy,
        usePagination )

    const handleChangePage = (event, newPage) => gotoPage(newPage)
    
    const handleChangeRowsPerPage = event => setPageSize(Number(event.target.value))

      return (
          <div>
              <MaterialUiTable {...getTableProps} >
                  <TableHead>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headers.map(column => (
                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            {column.id !== 'selection' ? (
                                <TableSortLabel
                                    active={column.isSorted}
                                    direction={column.isSortedDesc ? 'desc' : 'asc'} />) : null
                            }
                        </TableCell>
                        ))}
                    </TableRow>
                    ))}
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.canFilter ? column.render('Filter') : null}
                            </TableCell>
                            ))}
                        </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <TableCell {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </TableCell>
                                )
                            })}
                            </TableRow>
                        )
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: 'All', value: rows.length },
                        ]}
                        count={rows.length}
                        rowsPerPage={pageSize}
                        page={pageIndex}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                  </TableFooter>
              </MaterialUiTable>
          </div>
      );
}