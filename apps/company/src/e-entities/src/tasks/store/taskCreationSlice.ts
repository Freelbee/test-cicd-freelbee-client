import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  taskCreationModalOpened: false
};

export const taskCreationSlice = createSlice({
  name: `taskCreationSlice`,
  initialState,
  reducers: {
    setTaskCreationModalOpened: (state, action: PayloadAction<boolean>) => {
      state.taskCreationModalOpened = action.payload;
    }
  }
});

export const { setTaskCreationModalOpened } = taskCreationSlice.actions;
export const taskCreationReducer = taskCreationSlice.reducer;
