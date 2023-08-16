import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import settingReducer from './settingSlice';
import nodesReducer from './nodesSlice';
import modalboxReducer from './modalboxSlice';
import inboxsReducer from './inboxsSlice';
import mapRoutingMachineReducer from './mapRoutingMachineSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({ setting: settingReducer, auth: authReducer, map: mapRoutingMachineReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        modalbox: modalboxReducer,
        nodes: nodesReducer,
        inboxs: inboxsReducer,
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
