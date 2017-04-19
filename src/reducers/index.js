import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import people from './people'
import scene from './scene'

const reducers = combineReducers({
  people,
  scene,
})

export default createStore(reducers, applyMiddleware(logger))
