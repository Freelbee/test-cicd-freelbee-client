import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeneralPopupError } from '../../axios-api-config/dtos/GeneralPopupError';

type GeneralStates = {
  errors: Array<GeneralPopupError>,
}

const initialState: GeneralStates = {
  errors: []
};

export const generalStatesSlice = createSlice({
  name: `generalStates`,
  initialState,
  reducers: {

    addErrors: (state, action: PayloadAction<GeneralPopupError>) => {
      state.errors = [...state.errors, action.payload];
      // state.errors.push(action.payload);
    },
    removeError: (state, action: PayloadAction<number>) => {
      state.errors = state.errors.filter(er => er.id !== action.payload);
      // state.errors.push(action.payload);
    }
  }
});

export const {
  addErrors,
  removeError
} = generalStatesSlice.actions;

export const generalStatesReducer = generalStatesSlice.reducer;
