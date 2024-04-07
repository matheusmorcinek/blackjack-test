export const BLACKJACK_STATUS_LOADING = 'BLACKJACK_STATUS_LOADING';
export const BLACKJACK_STATUS_FAILURE = 'BLACKJACK_STATUS_FAILED';
export const BLACKJACK_STATUS_SUCCESS = 'BLACKJACK_STATUS_LOADED';


export const blackjackStatusLoading = () => ({ type: BLACKJACK_STATUS_LOADING });
export const blackjackStatusFailed = () => ({ type: BLACKJACK_STATUS_FAILURE });

export const blackjackStatusLoaded = (data) => ({
    type: BLACKJACK_STATUS_SUCCESS,
    payload: data
});

var requestOptions = {
    method: 'GET'
};

// Thunk function
export const getBlackjackStatus = () => async (dispatch) => {
    dispatch(blackjackStatusLoading());
    await fetch('http://localhost:3000/blackjack/status', requestOptions)
        .then(response => {

            if (response.ok) {
                response.json().then(parsedBody => {

                    dispatch(blackjackStatusLoaded(parsedBody));
                });
            };

            if (response.status === 500) {
                throw new Error('Something went wrong.');
            };
        })
        .catch(error => {
            console.error(error);
            dispatch(blackjackStatusFailed());
        });
};