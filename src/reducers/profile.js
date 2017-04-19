const initialState = {
  linkedinId:  null,
  orientation: null,
  randos: [],
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'profile:linkin':
      return {
        ...state,
        linkedinId: action.linkedinId,
      }
    case 'profile:setOrientation':
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
