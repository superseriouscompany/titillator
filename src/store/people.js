import players from '../players'

shuffle(players)

const initialState = {
  players: players,
}

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'matchup:next':
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

let round = 0;
let index = 0;
let ladder = [].concat(players)
function matchup(players) {
  if( index + 1 >= ladder.length ) {
    ladder = arrangeLadder(ladder, round)
    round++;
    console.log('Starting round', round);
    index = 0;
  }

  const people = {
    blue:  ladder[index],
    red:   ladder[index+1],
    round: round,
  }
  index += 2;

  return people
}

function arrangeLadder(ladder, round) {
  let tiers = [];
  for( var i  = 0; i < round + 2; i++ ) {
    tiers.push([])
  }
  ladder.forEach((p) => {
    tiers[p.wins.length].push(p)
  })

  tiers = tiers.reverse()
  tiers.forEach((t) => {
    shuffle(t)
  })
  return [].concat.apply([], tiers)
}

function choose(players, winner, loser) {
  return players.map((p) => {
    if( p.id === winner ) {
      p.wins.push(loser)
      p.votes++
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
