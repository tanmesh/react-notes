import React from 'react'
import { StyledButton } from '../../../../styled-components/Button'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './cakeSlice'

const CakeView = () => {
    /**
     * A selector function what takes redux state as an argument and returns the data that the component needs from the state.
     */
    const numOfCakes = useSelector((state) => state.cake.numOfCakes)

    /**
     * useDispatch hook returns a reference to the dispatch function from the Redux store.
     */
    const dispatch = useDispatch()

    return (
        <div>
            <h4>Number of cakes - {numOfCakes}</h4>
            <StyledButton onClick={() => dispatch(ordered())}>Order cake</StyledButton>
            <StyledButton onClick={() => dispatch(restocked(5))}>Restock cakes</StyledButton>
        </div>
    )
}

export default CakeView
