import { combineReducers } from '@reduxjs/toolkit';
import blackjackStartReducer from './blackjack-start-reducer';
import blackjackStatusReducer from './blackjack-status-reducer';

const rootReducer = combineReducers({
    blackjackStart: blackjackStartReducer,
    blackjackStatus: blackjackStatusReducer
});

export default rootReducer;
