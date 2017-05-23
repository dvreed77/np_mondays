// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import createHistory from 'history/createBrowserHistory'


import 'bootstrap/dist/css/bootstrap.css'

import 'leaflet/dist/leaflet.css'

// import '//unpkg.com/leaflet@1.0.3/dist/leaflet.cs'

import './css/style.css'

const store = configureStore()

const history = createHistory()
// const history = syncHistoryWithStore(hashHistory, store)

const root = document.createElement('div')
document.body.appendChild(root)

render(
  <Root store={store} history={history} />,
  root
)