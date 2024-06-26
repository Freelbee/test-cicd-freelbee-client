import { onboardingReducer, taskSliceReducer, zohoAPI } from "@freelancer/entities";
import { API } from "@freelancer/shared";
import { ErrorHelper } from "@freelbee/shared/error";
import { ErrorText } from "@freelbee/shared/ui-kit";
import { combineReducers, configureStore, isRejectedWithValue,Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn('Async error!');
        console.log(action);
        toast(<ErrorText title={"Error"} message={ErrorHelper.GetErrorMessageOrDefault(action.payload)} />, {type: 'error'})
        // Sentry.captureException(action.payload);
        // api.dispatch(addErrors({
        //     error: ApiErrorAdapter.getPayAssistantError(action.payload),
        //     title: action?.meta?.baseQueryMeta?.title
        // }));
    }
    return next(action);
};

const middlewares = [
    API.middleware,
    rtkQueryErrorLogger
];

if(process.env.NODE_ENV === `development`) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

export const rootReducer = combineReducers({
    onboardingReducer,
    taskSliceReducer,
    [zohoAPI.reducerPath]: zohoAPI.reducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore[`dispatch`];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;