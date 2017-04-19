const initialState = {
  accessToken:  null,
  orientation: null,
  randos: [],
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'profile:linkin':
      return {
        ...state,
        accessToken: action.accessToken,
      }
    case 'profile:orient':
      return {
        ...state,
        orientation: action.orientation,
      }
    case 'profile:setStranger':
      return {
        ...state,
        randos: [].concat(state.randos, action.rando)
      }
    default:
      return state
  }
}
