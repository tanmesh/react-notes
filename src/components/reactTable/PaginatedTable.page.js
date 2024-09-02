import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { StyledButton } from '../../styled-components/Button'

const PaginatedTablePage = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    },
        usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage, // Helper function to navigate to the next page
        previousPage, // Helper function to navigate to the previous page
        canNextPage, // A boolean value indicating if there is a next page
        canPreviousPage, // A boolean value indicating if there is a previous page
        pageOptions, // An array of all the page numbers
        state,
        prepareRow
    } = tableInstance

    const { pageIndex } = state

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>Paginated Table</h1>
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
                        page.map(row => {
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
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</StyledButton>
                <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>Next</StyledButton>
            </div>
        </div>
    )
}

export default PaginatedTablePage
