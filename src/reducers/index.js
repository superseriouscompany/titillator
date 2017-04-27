import {persistStore, autoRehydrate} from 'redux-persist'
import logger                        from 'redux-logger'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

import matchup   from './matchup'
import scene     from './scene'
import profile   from './profile'
import hydration from './hydration'
import list      from './list'
import results   from './results'

const reducers = combineReducers({
  hydration,
  matchup,
  scene,
  profile,
  list,
  results,
})

const middleware = []
if( window.location.href.match(/localhost/) ) {
  middleware.push(logger)
}

const store = createStore(reducers, undefined, compose(
  applyMiddleware(...middleware),
  autoRehydrate()
))

const persistence = persistStore(store, {whitelist: [
  'profile',
  'matchup',
  'results',
]})

export default store

export function clear() {
  persistence.purge()
}
