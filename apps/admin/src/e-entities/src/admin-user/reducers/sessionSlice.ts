import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataSliceType, Token_Enum } from '@admin/shared';
import { SessionData } from '@admin/entities';
import { SessionDataResponse } from '../../auth/dto/SessionDataResponse';
import { TelegramUser } from '../../auth/dto/TelegramUser';

const initialState: IDataSliceType<SessionData> = {
  data: {
    status: null,
    adminUser: null
  },
  loaded: false
};

export const sessionSlice = createSlice({
  name: `sessionSlice`,
  initialState,
  reducers: {
    setSessionData: (state, action: PayloadAction<SessionDataResponse>) => {
      state.data.status = action.payload.authStatus;
      state.data.adminUser = action.payload.adminUser;
      if (action?.payload?.tokenPair?.accessToken && action?.payload?.tokenPair?.refreshToken) {
        localStorage.setItem(Token_Enum.ACCESS_TOKEN, action.payload.tokenPair.accessToken);
        localStorage.setItem(Token_Enum.REFRESH_TOKEN, action.payload.tokenPair.refreshToken);
      }
      state.loaded = true;
    },
    setUserAdmin: (state, action: PayloadAction<TelegramUser>) => {
      state.data.adminUser = action.payload;
      state.loaded = true;
    },
    clearSession: (state) => {
      state.data.status = null;
      state.data.adminUser = null;
      state.loaded = false;
    }
  }
});

export const { setSessionData, clearSession, setUserAdmin } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
