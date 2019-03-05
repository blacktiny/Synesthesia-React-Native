import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers/index";
import rootSaga from '../sagas/index'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['backgroundSoundReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(sagaMiddleware, logger)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(middleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // middleware
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store

// redux persist. If the below line is open then redux state will not be stored
// window.persistor = persistor.purge() 

window.store = store

