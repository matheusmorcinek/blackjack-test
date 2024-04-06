export const BLACKJACK_START_LOADING = 'BLACKJACK_START_LOADING';
export const BLACKJACK_START_FAILURE = 'BLACKJACK_START_FAILED';
export const BLACKJACK_START_SUCCESS = 'BLACKJACK_START_LOADED';


export const blackjackLoading = () => ({ type: BLACKJACK_START_LOADING });
export const blackjackFailed = () => ({ type: BLACKJACK_START_FAILURE });

export const blackjackLoaded = (data) => ({
    type: BLACKJACK_START_SUCCESS,
    payload: data
});

var requestOptions = {
    method: 'POST'
};

// Thunk function
export const startBlackjack = () => async (dispatch) => {
    dispatch(blackjackLoading());
    await fetch('http://localhost:3000/blackjack/start', requestOptions)
        .then(response => {

            if (response.ok) {
                response.json().then(parsedBody => {

                    dispatch(blackjackLoaded(parsedBody));
                });
            };

            if (response.status === 500) {
                throw new Error('Something went wrong.');
            };
        })
        .catch(error => {
            console.error(error);
            dispatch(blackjackFailed());
        });
};