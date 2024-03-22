import { zohoAPI } from "@landing/features";
import { API } from "@landing/shared";
import { combineReducers, configureStore, isRejectedWithValue,Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
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

const rootReducer = combineReducers({
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