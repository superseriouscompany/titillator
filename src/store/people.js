import players from '../players'

const initialState = {
  players: players.map((p, id) => {
    p.votes   = 0;
    p.unrated = players.map((_, id) => {
      return id
    });
    return p
  })
}

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'people:choose':
      console.log('person chosen', action.winner, action.loser)
      return state;
    default:
      return state;
  }
}
