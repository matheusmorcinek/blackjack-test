export const BLACKJACK_PLAYER_STAND_LOADING = 'BLACKJACK_PLAYER_STAND_LOADING';
export const BLACKJACK_PLAYER_STAND_FAILURE = 'BLACKJACK_PLAYER_STAND_FAILED';
export const BLACKJACK_PLAYER_STAND_SUCCESS = 'BLACKJACK_PLAYER_STAND_LOADED';

export const blackjackPlayerStandLoading = () => ({ type: BLACKJACK_PLAYER_STAND_LOADING });
export const blackjackPlayerStandFailed = () => ({ type: BLACKJACK_PLAYER_STAND_FAILURE });

export const blackjackPlayerStandLoaded = (data) => ({
    type: BLACKJACK_PLAYER_STAND_SUCCESS,
    payload: data
});

var requestOptions = {
    method: 'POST'
};

// Thunk function
export const playerStand = () => async (dispatch) => {
    dispatch(blackjackPlayerStandLoading());
    await fetch('http://localhost:3000/blackjack/player/stand', requestOptions)
        .then(response => {

            if (response.ok) {
                response.json().then(parsedBody => {

                    dispatch(blackjackPlayerStandLoaded(parsedBody));
                });
            };

            if (response.status === 500) {
                throw new Error('Something went wrong.');
            };
        })
        .catch(error => {
            console.error(error);
            dispatch(blackjackPlayerStandFailed());
        });
};