import { settings } from './auth'
import { postReducer } from './post';
import { userReducer } from './users';
import { likePostReducer } from './likes';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { bookmarkPostReducer } from './bookmark'
import {followerPostReducer} from './followUnfollowreducer'

const rootReducer = combineReducers({
	likePostReducer,
	bookmarkPostReducer,
	settings,
	postReducer,
	userReducer,
	followerPostReducer,
	router: routerReducer
})

export default rootReducer;