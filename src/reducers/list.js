const initialState = {
  top: [],
  middle: [],
  bottom: [],
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'list:middle':
      return {
        ...state,
        middle: sortByVotes(action.middle)
      }
    default:
      return state
  }
}

function sortByVotes(players) {
  return players.sort((a, b) => {return a.votes > b.votes ? -1 : 1})
}
