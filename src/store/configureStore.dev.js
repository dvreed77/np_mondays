import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'


const history = createHistory()

// const routingMiddleware = routerMiddleware(hashHistory)
const routingMiddleware = routerMiddleware(history)


const ignoreActions = ['redux-form/CHANGE', 'redux-form/FOCUS', 'redux-form/BLUR']
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, routingMiddleware, createLogger({
        predicate: (getState, action) => {
          return ignoreActions.indexOf(action.type) < 0
        }
      })),
      // persistState()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore