import {combineReducers,applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import authReducers from './reducers/authReducers'
import errorReducers from './reducers/errorReducers'
const rootReducer = combineReducers({
    auth :authReducers,
    error :errorReducers,
});

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => {
    console.log(store.getState())
})

export default store;