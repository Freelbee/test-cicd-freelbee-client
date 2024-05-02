import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    onboardingOpened: false
};

export const onboardingSlice = createSlice({
    name: `onboardingSlice`,
    initialState,
    reducers: {
        setOnboardingOpened: (state, action : PayloadAction<boolean>) => {
            state.onboardingOpened = action.payload;
        },
    },
});

export const {setOnboardingOpened} = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
