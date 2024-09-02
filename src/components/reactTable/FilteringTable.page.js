import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'

const FilteringTablePage = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const defaultColumn = useMemo(() => {
        // This function returns the default column properties that are applied to every column
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn
    },
        useFilters,
        useGlobalFilter,
    ) // This hook enables the sorting functionality

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state, // This is the state object that contains the global filter value
        setGlobalFilter // This is the function that sets the global filter value
    } = tableInstance

    const { globalFilter } = state

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>React Table</h1>
            <>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        </div>
    )
}

export default FilteringTablePage
