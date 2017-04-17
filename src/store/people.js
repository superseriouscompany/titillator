import players from '../players'

const initialState = {
  players: players.map((p, id) => {
    p.id      = id;
    p.votes   = 0;
    p.unrated = players.map((_, id) => {
      return id
    });
    return p
  }),
}

const nextMatchup = matchup(initialState.players)
initialState.red  = nextMatchup.red
initialState.blue = nextMatchup.blue

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'people:choose':
      const players = choose(state.players, action.winner, action.loser)
      const nextMatchup = matchup(players)
      return {
        ...state,
        players: players,
        red:     nextMatchup.red,
        blue:    nextMatchup.blue,
      }
    default:
      return state;
  }
}

function matchup(players) {
  const peopleLeft = players.filter((p) => {
    return p.unrated.length
  })

  if( !peopleLeft.length ) {
    return {
      red: null,
      blue: null,
      done: true,
    }
  }

  const red = peopleLeft[Math.floor(Math.random()*peopleLeft.length)]

  return {
    red:  red,
    blue: players[red.unrated[Math.floor(Math.random()*red.unrated.length)]],
  }
}

function choose(players, winner, loser) {
  return players.map((p) => {
    if( p.id === winner ) {
      p.votes++;
      p.unrated = p.unrated.filter((id) => {
        return id !== loser
      })
    } else if( p.id === loser ) {
      p.unrated = p.unrated.filter((id) => {
        return id !== winner
      })
    }

    return p
  })
}
