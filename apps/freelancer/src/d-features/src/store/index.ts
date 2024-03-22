import { zohoAPI } from "@freelancer/features";
import { API } from "@freelancer/shared";
import { combineReducers, configureStore, isRejectedWithValue,Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn('Async error!');
        console.log(action);
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