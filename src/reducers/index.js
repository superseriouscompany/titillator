import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import matchup from './matchup'
import scene   from './scene'
import profile from './profile'

const reducers = combineReducers({
  matchup,
  scene,
  profile,
})

export default createStore(reducers, applyMiddleware(logger))
