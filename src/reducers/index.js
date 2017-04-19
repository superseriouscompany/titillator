import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import matchup from './matchup'
import scene from './scene'

const reducers = combineReducers({
  matchup,
  scene,
})

export default createStore(reducers, applyMiddleware(logger))
