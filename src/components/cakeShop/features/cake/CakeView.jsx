import React from 'react'
import { StyledButton } from '../../../../styled-components/Button'
import { useSelector } from 'react-redux'

const CakeView = () => {
    /**
     * A selector function what takes redux state as an argument and returns the data that the component needs from the state.
     */
    const numOfCakes = useSelector((state) => state.cake.numOfCakes)

    return (
        <div>
            <h4>Number of cakes - {numOfCakes}</h4>
            <StyledButton>Order cake</StyledButton>
            <StyledButton>Restock cakes</StyledButton>
        </div>
    )
}

export default CakeView
