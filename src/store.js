import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import people from './store/people'
import halp   from './store/halp'

const reducers = combineReducers({
  people,
  halp,
})

export default createStore(reducers, applyMiddleware(logger))
