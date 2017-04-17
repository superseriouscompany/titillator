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
      const nextMatchup = matchup(state.players)
      return {
        ...state,
        red:  nextMatchup.red,
        blue: nextMatchup.blue,
      }
    default:
      return state;
  }
}

function matchup(players) {
  return {
    red:  players[Math.floor(Math.random()*players.length)],
    blue: players[Math.floor(Math.random()*players.length)],
  }
}
