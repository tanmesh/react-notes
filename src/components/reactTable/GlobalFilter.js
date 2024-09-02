import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

/**
 * This component is used to filter the data in the table.
 * When we need to use Client-side filtering, ie, when the data is already loaded in the client side, we can use this component.
 */
const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <span>
            Search: {' '}
            <input
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
            />
        </span>
    )
}

export default GlobalFilter
