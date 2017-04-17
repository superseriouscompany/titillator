import {combineReducers, createStore} from 'redux';

function rankings(state = {}, action) {
  switch(action.type) {
    case 'cool':
      console.log('nice')
      return state;
    default:
      return state;
  }
}

const reducers = combineReducers({
  rankings,
})

export default createStore(reducers)
