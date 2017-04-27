const initialState = {
  players:     [],
  // TODO: break into separate reducers
  round:       0,
  index:       0,
  comparisons: 0,
  filtered:    false,
}

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'ladder:reset':
      return initialState
    case 'ladder:load':
      return {
        ...state,
        players: action.ladder,
      }
    case 'ladder:shuffle':
      return {
        ...state,
        players: shuffleLadder(state.players),
      }
    case 'ladder:remove':
      return {
        ...state,
        players: remove(state.players, action.id),
      }
    case 'ladder:filter':
      return {
        ...state,
        players: filter(state.players, action.ids),
        filtered: true,
      }
    case 'ladder:playoff':
      return {
        ...state,
        players: addToPlayoffs(filter(state.players, action.ids)),
        playoff: true
      }
    case 'matchup:next':
      const nextMatchup = matchup(state.players, state.round, state.index, state.comparisons)
      return {
        ...state,
        ...nextMatchup,
      }
    case 'matchup:choose':
      const players = choose(state.players, action.winner, action.loser)
      return {
        ...state,
        comparisons: state.comparisons + 1,
        players: players,
      }
    case 'round:advance':
      return {
        ...state,
        round:       state.round + 1,
        index:       0,
        comparisons: 0,
      }
    default:
      return state;
  }
}

function matchup(ladder, round, index, comparisons) {
  let people = {}
  // Find person for left spot by moving index up until we find someone who hasn't been rated this round.
  while( index < ladder.length ) {
    people.blue = ladder[index]
    const valid = people.blue.wins.length + people.blue.losses.length <= round
    if( !valid ) { index++; continue; }
    break;
  }
  if( index >= ladder.length ) {
    return {
      blue: null,
      red: null,
    }
  }

  // If there are an odd number of people and we're the last in line, start next round.
  if( comparisons >= Math.floor(ladder.length / 2)  ) {
    // TODO: people who get byes are often dismissed forever...
    people.blue.losses.push(-1)
    return {
      blue: null,
      red: null,
    }
  }

  // Find person to compare to
  let red = index
  let dir = 1
  let attempts = 0
  while(true) {
    if( attempts >= ladder.length ) {
      return {
        blue: null,
        red: null,
      }
    }

    // if we're at the very bottom of the ladder, search up the ladder
    // if we're at the very top of the ladder, search down the ladder
    if( red === ladder.length - 1) {
      dir = -1
    } else if( red === 0 ) {
      dir = 1
    }
    red += dir;

    // Check next person
    people.red = ladder[red]
    // Reject if they've been rated this round.
    const valid = people.red.wins.length + people.red.losses.length <= round
    // Reject if this matchup has been shown in a previous round.
    const compared =
      people.blue.wins.indexOf(people.red.id) !== -1   ||
      people.blue.losses.indexOf(people.red.id) !== -1 ||
      people.blue.id === people.red.id

    // If we have a valid match, break out of while: true
    if( valid && !compared ) {
      break
    }
    attempts++
  }

  return people
}

function filter(players, ids) {
  return players.filter((p) => {
    return ids.indexOf(p.id) !== -1
  })
}

function remove(players, id) {
  return players.filter((p) => {
    return p.id !== id
  })
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

function shuffleLadder(ladder) {
  let tiers = [];
  let maxWins = 0;
  ladder.forEach((l) => {
    maxWins = Math.max(l.wins.length + l.losses.length, maxWins)
  })
  for( var i  = 0; i < maxWins + 1; i++ ) {
    tiers.push([])
  }
  ladder.forEach((p) => {
    tiers[p.wins.length].push(p)
  })
  tiers = tiers.reverse().map((t) => {
    return shuffle(t)
  })
  return [].concat.apply([], tiers)
}

function shuffle(arr) {
  let array = [].concat(arr)
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

function addToPlayoffs(players) {
  return players.map((p) => {
    p.regularSeasonWins = [].concat(p.wins)
    p.regularSeasonLosses = [].concat(p.losses)
    p.regularSeasonVotes = p.votes
    p.wins = []
    p.losses = []
    p.votes = 0
    return p
  })
}
