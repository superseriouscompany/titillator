export default function(state = {name: 'Login'}, action) {
  switch(action.type) {
    case 'scene:change':
      return {
        name: action.scene
      }
    default:
      return state
  }
}
