export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
    data: {}
};

const blackjackStatusReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'BLACKJACK_STATUS_LOADED': {

            return {
                status: 'succeeded',
                data: action.payload
            };
        };

        case 'BLACKJACK_STATUS_LOADING': {

            return {
                status: 'loading',
                data: {}
            };
        };

        case 'BLACKJACK_STATUS_FAILED': {

            return {
                status: 'failed',
                data: {}
            };
        };

        default:

            return state;
    };
};

export default blackjackStatusReducer;