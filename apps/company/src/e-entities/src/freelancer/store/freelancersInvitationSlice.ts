import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  freelancerInvitationModalOpened: false
};

export const freelancerInvitationSlice = createSlice({
  name: 'freelancerInvitationSlice',
  initialState,
  reducers: {
    setFreelancerInvitationModalOpened: (state, action: PayloadAction<boolean>) => {
      state.freelancerInvitationModalOpened = action.payload;
    }
  }
});

export const {setFreelancerInvitationModalOpened} = freelancerInvitationSlice.actions;
export const freelancerInvitationReducer = freelancerInvitationSlice.reducer;
