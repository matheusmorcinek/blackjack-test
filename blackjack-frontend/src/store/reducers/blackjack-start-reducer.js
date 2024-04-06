export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
    message: ''
};

const blackjackStartReducer = (state = INITIAL_STATE, action) => {

    //removing unnecessary console logs, the first reducers calls are just the Redux checks.
    if (!action.type.includes('@@redux')) {
        console.log(' ');
        console.log('COURSE Reducer');
        console.log('current state', state);
        console.log('action', action);
    }

    switch (action.type) {

        case 'BLACKJACK_START_LOADED': {

            return {
                status: 'succeeded',
                message: action.payload.message
            };
        };

        case 'BLACKJACK_START_LOADING': {

            return {
                ...state,
                status: 'loading'
            };
        };

        case 'BLACKJACK_START_FAILED': {

            return {
                ...state,
                status: 'failed'
            };
        };

        default:

            return state;
    };
};

export default blackjackStartReducer;