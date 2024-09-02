import React from 'react'

/**
 * This component is used to filter the data in the table.
 * When we need to use Client-side filtering, ie, when the data is already loaded in the client side, we can use this component.
 */
const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            Search: {' '}
            <input
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    )
}

export default GlobalFilter
