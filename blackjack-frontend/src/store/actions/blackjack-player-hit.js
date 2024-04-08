import { getBlackjackStatus } from './blackjack-status';

export const BLACKJACK_PLAYER_HIT_LOADING = 'BLACKJACK_PLAYER_HIT_LOADING';
export const BLACKJACK_PLAYER_HIT_FAILURE = 'BLACKJACK_PLAYER_HIT_FAILED';
export const BLACKJACK_PLAYER_HIT_SUCCESS = 'BLACKJACK_PLAYER_HIT_LOADED';
export const BLACKJACK_PLAYER_HIT_RESET = 'BLACKJACK_PLAYER_HIT_RESET';


export const blackjackPlayerHitLoading = () => ({ type: BLACKJACK_PLAYER_HIT_LOADING });
export const blackjackPlayerHitFailed = () => ({ type: BLACKJACK_PLAYER_HIT_FAILURE });
export const blackjackPlayerHitReset = () => ({ type: BLACKJACK_PLAYER_HIT_RESET });

export const blackjackPlayerHitLoaded = (data) => ({
    type: BLACKJACK_PLAYER_HIT_SUCCESS,
    payload: data
});

var requestOptions = {
    method: 'POST'
};

// Thunk function
export const playerHit = () => async (dispatch) => {
    dispatch(blackjackPlayerHitLoading());
    await fetch('http://localhost:3000/blackjack/player/hit', requestOptions)
        .then(response => {

            if (response.ok) {
                response.json().then(parsedBody => {

                    dispatch(blackjackPlayerHitLoaded(parsedBody));
                    dispatch(getBlackjackStatus());
                });
            };

            if (response.status === 500) {
                throw new Error('Something went wrong.');
            };
        })
        .catch(error => {
            console.error(error);
            dispatch(blackjackPlayerHitFailed());
        });
};