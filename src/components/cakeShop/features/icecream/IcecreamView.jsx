import React from 'react'
import { StyledButton } from '../../../../styled-components/Button'
import { useSelector } from 'react-redux';

const IcecreamView = () => {
    const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams)

    return (
        <div>
            <h4>Number of ice-cream - {numOfIcecreams}</h4>
            <StyledButton>Order ice-cream</StyledButton>
            <StyledButton>Restock ice-cream</StyledButton>
        </div>
    )
}

export default IcecreamView
