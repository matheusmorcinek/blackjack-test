import { combineReducers } from '@reduxjs/toolkit';
import blackjackStartReducer from './blackjack-start-reducer';

const rootReducer = combineReducers({
    blackjackStart: blackjackStartReducer,
});

export default rootReducer;
