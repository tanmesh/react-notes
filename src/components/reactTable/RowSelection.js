import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    },
        useRowSelect, // This is the hook that enables row selection in the table by keeping track of the selected rows
        (hooks) => {
            // visibleColumns : This is a list of all the columns that are visible in the table
            hooks.visibleColumns.push((columns) => {
                // Returns an array of columns with a checkbox for selection
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <input type='checkbox' {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <input type='checkbox' {...row.getToggleRowSelectedProps()} />
                            </div>
                        )
                    },
                    ...columns
                ]
            }
            )
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows // This is an array of all the rows that are selected
    } = tableInstance

    const firstPageRows = rows.slice(0, 10)

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-column align-items-center'>
                <h1>Row Selection Table</h1>
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            firstPageRows.map(row => {
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
            </div>
            <div className='d-flex justify-content-start mt-4'>
                <pre>
                    <code>
                        {JSON.stringify(
                            {
                                selectedFlatRows: selectedFlatRows.map(row => row.original)
                            },
                            null,
                            2
                        )}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default RowSelection
