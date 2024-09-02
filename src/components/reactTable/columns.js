/**
 * Define the columns for the react-table. Its an array of objects.
 * 
 * Each object represents a column in the table. The columns which are not included in this array will not be displayed.
 */
export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id' // 'accessor' is used to associate each column with the row data
    },
    {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Date of Birth',
        accessor: 'data_of_birth'
    },
    {
        Header: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    }
]
