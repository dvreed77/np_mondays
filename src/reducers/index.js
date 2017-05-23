import {combineReducers} from 'redux'
import merge from 'lodash/merge'
import keyBy from 'lodash/keyBy'
import {routerReducer as routing} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import reduxCrud from 'redux-crud'
import {API_ROOT} from '../settings'
import { auth } from './auth'

let postionActions = reduxCrud.actionTypesFor('positions');
const standardReducers = reduxCrud.Map.reducersFor('positions')

function positionReducers(state={}, action) {
  switch(action.type) {
    case postionActions.fetchSuccess:
      // ...delete comments for the given post and return a new state for comments
      console.log('FETCH SUCCESS', action)
      return merge({}, state, keyBy(action.records, 'id'))
    default:
      // pass to the generated reducers
      return standardReducers(state, action);
  }
}


const entities = combineReducers({
  positions: positionReducers,
  // positions: reduxCrud.List.reducersFor('positions', {store: reduxCrud.STORE_MUTABLE}),
  // positions: reduxCrud.Map.reducersFor('positions'),
  standardPositions: reduxCrud.List.reducersFor('standardPositions', {store: reduxCrud.STORE_MUTABLE}),
  articles: reduxCrud.List.reducersFor('articles', {store: reduxCrud.STORE_MUTABLE})
})



let positionsDefaultState = {
  count: null,
  numClassified: null,
  isFetching: 0,
  nextPageUrl: `${API_ROOT}/api/training_position/`
}

function positions(state = positionsDefaultState, action) {
  let { isFetching } = state
  switch (action.type) {
    case postionActions.fetchStart:
      return Object.assign({}, state, {
        isFetching: isFetching + 1
      })
    case postionActions.fetchSuccess:
      return Object.assign({}, state, action.data, {
        isFetching: isFetching - 1
      })
    case postionActions.fetchError:
      return Object.assign({}, state, action.data, {
        isFetching: isFetching - 1
      })
    default:
      return state
  }
}

const pagination = combineReducers({
  positions
})

const rootReducer = combineReducers({
  auth,
  entities,
  routing,
  pagination,
  form: formReducer
})

export default rootReducer