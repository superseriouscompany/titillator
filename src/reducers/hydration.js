export default function(state = false, action) {
  switch(action.type) {
    case 'persist/REHYDRATE':
      return true
    default:
      return state
  }
}
