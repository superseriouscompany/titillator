import players from '../players'

shuffle(players)

const initialState = {
  players: players,
}

export default function people(state = initialState, action) {
  switch(action.type) {
    case 'matchup:next':
      const nextMatchup = matchup()
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

let round       = 0;
let index       = 0;
let comparisons = 0;
let ladder      = [].concat(players)

function matchup() {
  let people = {
    round: round,
  }
  // Find person for left spot by moving index up until we find someone who hasn't been rated this round.
  while( index < ladder.length ) {
    people.blue = ladder[index]
    const valid = people.blue.wins.length + people.blue.losses.length <= round
    if( !valid ) { index++; continue; }
    break;
  }
  if( index >= ladder.length ) {
    return nextRound(players)
  }

  // If there are an odd number of people and we're the last in line, start next round.
  if( comparisons >= Math.floor(players.length / 2)  ) {
    // TODO: people who get byes are often dismissed forever...
    people.blue.losses.push(-1)
    return nextRound(players)
  }

  // Find person to compare to
  let red = index
  let dir = 1
  while(true) {
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
      people.blue.losses.indexOf(people.red.id) !== -1

    // If we have a valid match, break out of while: true
    if( valid && !compared ) {
      break
    }
  }

  comparisons++
  return people
}

function nextRound(players) {
  ladder      = arrangeLadder(ladder, round)
  round++;
  index       = 0;
  comparisons = 0;
  return matchup(players)
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
