import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import blockReducer from './reducers/block'
import gridReducer from './reducers/grid'
import authReducer from './reducers/auth'

import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
    combineReducers({
      block: blockReducer,
      grid: gridReducer,
      auth: authReducer
    }),
    applyMiddleware(thunk)
  );


const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store