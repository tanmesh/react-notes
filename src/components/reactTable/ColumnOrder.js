import React, { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { DarkButton } from '../../styled-components/Button'

const ColumnOrder = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    },
        useColumnOrder
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setColumnOrder
    } = tableInstance

    const changeOrder = () => {
        /**
         * It accepts an array of 'accessor' in the order you want them to appear in the table.
         * If we miss any accessor, it will be included at the end of the table.
         */
        setColumnOrder(['id', 'first_name', 'last_name', 'country', 'phone', 'date_of_birth'])
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>Column Ordering Table</h1>
            <DarkButton onClick={changeOrder}>Change column order</DarkButton>
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
        </div>
    )
}

export default ColumnOrder
