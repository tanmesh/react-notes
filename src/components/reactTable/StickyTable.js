import React, { useMemo } from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import { Styles } from '../../styled-components/Table'
import './table.css'

const StickyTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    },
        useBlockLayout,
        useSticky)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const firstPageRows = rows.slice(0, 50)

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>Sticky Table</h1>
            <Styles>
                <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
                    <div className="header">
                        {headerGroups.map((headerGroup) => (
                            <div {...headerGroup.getHeaderGroupProps()} className="tr" key={headerGroup.id}>
                                {headerGroup.headers.map((column) => (
                                    <div {...column.getHeaderProps()} className="th" key={column.id}>
                                        <strong>{column.render('Header')}</strong>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div {...getTableBodyProps()} className="body">
                        {firstPageRows.map((row) => {
                            prepareRow(row);
                            return (
                                <div {...row.getRowProps()} className="tr" key={row.id}>
                                    {row.cells.map((cell) => (
                                        <div {...cell.getCellProps()} className="td" key={cell.id}>
                                            {cell.render('Cell')}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Styles>
        </div>
    )
}

export default StickyTable
