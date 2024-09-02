/**
 * The entire applicate's state is split into multiple slices, each slice is a reducer.
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numOfCakes: 10,
};

/**
 * Redux Toolkit's createSlice function generates action creators and action types for the reducers.
 * It uses Immer library to allow writing reducers as simple as possible.
 */
const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes -= 1;
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload;
        },
    },
});

export default cakeSlice.reducer; // Default export
export const { ordered, restocked } = cakeSlice.actions; // Named exports