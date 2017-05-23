import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
// import routes from '../routes'
import { Route } from 'react-router'
import Home from '../containers/Home2'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export default class Root extends Component {
  render() {
    const {store, history} = this.props
    return (

      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Home}/>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// }

//   (
// <Provider store={store}>
//   <div>
//     <Router history={history} routes={routes} />
//   </div>
// </Provider>
//   )