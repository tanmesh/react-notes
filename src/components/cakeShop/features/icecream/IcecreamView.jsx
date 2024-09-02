import React from 'react'
import { StyledButton } from '../../../../styled-components/Button'
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './icecreamSlice';

const IcecreamView = () => {
    const [value, setValue] = React.useState(1)
    const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams)

    const dispatch = useDispatch()
    return (
        <div className='d-flex flex-column'>
            <h4>Number of ice-cream - {numOfIcecreams}</h4>
            <StyledButton onClick={() => { dispatch(ordered()) }}>Order ice-cream</StyledButton>
            <div className='d-flex flex-column'>
                <input
                    type='number'
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                />
                <StyledButton onClick={() => { dispatch(restocked(value)) }}>Restock ice-cream</StyledButton>
            </div>
        </div>
    )
}

export default IcecreamView
