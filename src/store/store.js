import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import calendarReducer from "./reducer";

const rootReducer = combineReducers({
    calendarPage : calendarReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

const persistor = persistStore(store)

export default store
export {persistor}