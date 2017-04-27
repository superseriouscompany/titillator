const initialState = {
  female: [],
  male:   [],
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'results:female':
      return {
        ...state,
        female: action.results,
      }
    case 'results:male':
      return {
        ...state,
        male: action.results,
      }
    default:
      return state
  }
}
