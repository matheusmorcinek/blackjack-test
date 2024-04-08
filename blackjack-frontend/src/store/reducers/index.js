import { combineReducers } from '@reduxjs/toolkit';
import blackjackStartReducer from './blackjack-start-reducer';
import blackjackStatusReducer from './blackjack-status-reducer';
import blackjackPlayerHitReducer from './blackjack-player-hit-reducer';
import blackjackPlayerStandReducer from './blackjack-player-stand-reducer';

const rootReducer = combineReducers({
    blackjackStart: blackjackStartReducer,
    blackjackStatus: blackjackStatusReducer,
    blackjackPlayerHit: blackjackPlayerHitReducer,
    blackjackPlayerStand: blackjackPlayerStandReducer
});

export default rootReducer;
