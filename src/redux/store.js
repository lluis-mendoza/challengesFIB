import { createStore, combineReducers, applyMiddleware} from 'redux';
import challengeReducer from './reducers/challengeReducer';
import authReducer from './reducers/authReducer';

import thunk from 'redux-thunk';

const reducer = combineReducers({
    challengeReducer,
    authReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;