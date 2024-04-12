import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    onboardingOpened: false
};

export const onboardingSlice = createSlice({
    name: `onboardingSlice`,
    initialState,
    reducers: {
        setOpened: (state, action : PayloadAction<boolean>) => {
            state.onboardingOpened = action.payload;
        },
    },
});

export const {setOpened} = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
