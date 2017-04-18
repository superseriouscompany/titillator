import players from '../players'

shuffle(players)

const initialState = {
  players: players,
}

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'cool:nice':
      return state
    case 'matchup:next':
      console.log(state.players.map(p => p.name))
      const nextMatchup = matchup(state.players)
      return {
        ...state,
        ...nextMatchup,
      }
    case 'people:choose':
      const players = choose(state.players, action.winner, action.loser)
      return {
        ...state,
        players: players,
      }
    default:
      return state;
  }
}

let index = 0;
function matchup(players) {
  if( index + 1 >= players.length ) {
    return {
      red:  null,
      blue: null,
      done: true,
    }
  }

  const people = {
    blue:  players[index],
    red: players[index+1],
  }
  index += 2;
  return people
}

function choose(players, winner, loser) {
  return players.map((p) => {
    if( p.id === winner ) {
      p.wins.push(loser)
      p.votes++;
    } else if( p.id === loser ) {
      p.losses.push(winner)
    }

    return p
  })
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
