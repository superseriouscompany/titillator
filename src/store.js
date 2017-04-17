import {combineReducers, createStore} from 'redux';
import players from './players'

const initialState = {
  players: players.map((p, id) => {
    p.votes   = 0;
    p.unrated = players.map((_, id) => {
      return id
    });
    return p
  })
}

function people(state = initialState, action) {
  switch(action.type) {
    case 'people:choose':
      console.log('person chosen', action.winner, action.loser)
      return state;
    default:
      return state;
  }
}

const reducers = combineReducers({
  people,
})

export default createStore(reducers)
