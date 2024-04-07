import { combineReducers } from '@reduxjs/toolkit';
import blackjackStartReducer from './blackjack-start-reducer';
import blackjackStatusReducer from './blackjack-status-reducer';
import blackjackPlayerHitReducer from './blackjack-player-hit-reducer';

const rootReducer = combineReducers({
    blackjackStart: blackjackStartReducer,
    blackjackStatus: blackjackStatusReducer,
    blackjackPlayerHit: blackjackPlayerHitReducer,
});

export default rootReducer;
