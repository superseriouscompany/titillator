import {persistStore, autoRehydrate}                   from 'redux-persist'
import logger                                          from 'redux-logger'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

import matchup from './matchup'
import scene   from './scene'
import profile from './profile'

const reducers = combineReducers({
  matchup,
  scene,
  profile,
})

const store = createStore(reducers, undefined, compose(
  applyMiddleware(logger),
  autoRehydrate()
))

const persistence = persistStore(store, {whitelist: [
  'profile',
//  'matchup',
]})

export default store

export function clear() {
  persistence.purge()
}
