import { format } from 'date-fns'

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
        disableFilters: true, // This property is used to disable the filter for this column
        sticky: 'left' // This property is used to stick the column to the left side of the table
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left'
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'data_of_birth',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age'
    }
]
