import { TaskCounterpartyDataDto } from '@freelbee/entities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TaskAcceptanceStep } from '../interface/TaskAcceptanceStep';

interface ITaskSlice {
    displayedTask: TaskCounterpartyDataDto | null,
    acceptanceStep: TaskAcceptanceStep | null,
    detailsOpen: boolean
}

const initialState: ITaskSlice = {
    displayedTask: null,
    acceptanceStep: null,
    detailsOpen: false
};

export const taskSlice = createSlice({
    name: `taskSlice`,
    initialState,
    reducers: {
        setDisplayedTask: (state, action : PayloadAction<TaskCounterpartyDataDto | null>) => {
            state.displayedTask = action.payload;
        },
        setAcceptanceStep: (state, action : PayloadAction<TaskAcceptanceStep | null>) => {
            state.acceptanceStep = action.payload;
        },
        setDetailsOpen: (state, action : PayloadAction<boolean>) => {
            if(!action.payload) {
                state.acceptanceStep = null;
                state.displayedTask = null;                
            }
            state.detailsOpen = action.payload;
        },
    },
});

export const {setAcceptanceStep, setDetailsOpen, setDisplayedTask} = taskSlice.actions;
export const taskSliceReducer = taskSlice.reducer;
