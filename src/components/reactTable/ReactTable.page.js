import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

const ReactTablePage = () => {
    const columns = useMemo(() => COLUMNS, []) // This ensures that the columns are not re-created on every render
    const data = useMemo(() => MOCK_DATA, []) // This ensures that the data is not re-created on every render

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, // This function returns the props that need to be added to the table element
        getTableBodyProps, // This function returns the props that need to be added to the table body element
        headerGroups, // This is an array of header groups. Each header group is an object that contains the headers for that group
        footerGroups, // This is an array of footer groups. Each footer group is an object that contains the footers for that group
        rows, // This is an array of rows. Each row is an object that contains the cells for that row
        prepareRow // This function needs to be called on each row before getting the row props
    } = tableInstance

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>React Table</h1>
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
                <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
        </div>
    )
}

export default ReactTablePage
