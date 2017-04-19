import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import people from './people'

const reducers = combineReducers({
  people,
})

export default createStore(reducers, applyMiddleware(logger))
