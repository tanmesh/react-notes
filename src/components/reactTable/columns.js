import { format } from 'date-fns'
import ColumnFilter from './ColumnFilter'
/**
 * Define the columns for the react-table. Its an array of objects.
 * 
 * Each object represents a column in the table. The columns which are not included in this array will not be displayed.
 */
export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id', // 'accessor' is used to associate each column with the row data
        Filter: ColumnFilter
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        Filter: ColumnFilter
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        Filter: ColumnFilter
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'data_of_birth',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
        Filter: ColumnFilter
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
        Filter: ColumnFilter
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        Filter: ColumnFilter
    }
]
