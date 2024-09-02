import React from 'react'
import { StyledButton } from '../../../../styled-components/Button'

const CakeView = () => {
    return (
        <div>
            <h4>Number of cakes - </h4>
            <StyledButton>Order cake</StyledButton>
            <StyledButton>Restock cakes</StyledButton>
        </div>
    )
}

export default CakeView
