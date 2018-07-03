import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import blockReducer from './reducers/block'
import gridReducer from './reducers/grid'

const store = createStore(
    combineReducers({
      block: blockReducer,
      grid: gridReducer
    }),
    applyMiddleware(thunk)
  );


export default store