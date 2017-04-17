import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import people from './store/people'

const reducers = combineReducers({
  people,
})

export default createStore(reducers, applyMiddleware(logger))
