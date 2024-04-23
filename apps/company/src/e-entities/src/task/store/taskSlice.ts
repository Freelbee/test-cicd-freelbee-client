import { TaskCounterpartyDataDto } from '@freelbee/entities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ITaskSlice {
    displayedTask: TaskCounterpartyDataDto | null,
    detailsOpen: boolean
}

const initialState: ITaskSlice = {
    displayedTask: null,
    detailsOpen: false
};

export const taskSlice = createSlice({
    name: `taskSlice`,
    initialState,
    reducers: {
        setDisplayedTask: (state, action : PayloadAction<TaskCounterpartyDataDto | null>) => {
            state.displayedTask = action.payload;
        },
        setDetailsOpen: (state, action : PayloadAction<boolean>) => {
            if(!action.payload) {
                state.displayedTask = null;                
            }
            state.detailsOpen = action.payload;
        },
    },
});

export const {setDetailsOpen, setDisplayedTask} = taskSlice.actions;
export const taskSliceReducer = taskSlice.reducer;
