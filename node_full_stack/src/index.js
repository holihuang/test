import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import AppRouter from './router'
import global from './common/global'
import reducers from './reducers/index'
import sagas from './sagas/index'

// saga
const sagaMiddleware = [createSagaMiddleware()]
const enhancer = compose(applyMiddleware(...sagaMiddleware))

// 初始化 store
const initialState = {}
const store = createStore(
    combineReducers({ ...reducers, routing }),
    initialState,
    enhancer,
)

// 执行saga
sagaMiddleware[0].run(sagas)
global.store = store

// render
const history = syncHistoryWithStore(hashHistory, store)
const root = document.getElementById('app')
ReactDOM.render(
<Provider store={store}>
    <AppRouter history={history} />
</Provider>
    , root
)

// 热替换
if (module.hot) {
    module.hot.accept('./router.js', () => {
        const AppRouter2 = require('./router.js').default
        ReactDOM.render(
        <AppContainer>
        <Provider store={store}>
            <AppRouter2 history={history} />
        </Provider>
        </AppContainer>
            , root
    )
    })
}
