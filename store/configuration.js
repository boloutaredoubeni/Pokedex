import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from '../reducers';
import createLogger from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist'

export function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
                promise,
                createLogger(),
            ),
            autoRehydrate()
        )
    )
}

export function configurePersistor(store) {
    return persistStore(store, {storage: AsyncStorage});
}