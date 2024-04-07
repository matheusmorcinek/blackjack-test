export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
    data: {}
};

const blackjackStatusReducer = (state = INITIAL_STATE, action) => {

    //removing unnecessary console logs, the first reducers calls are just the Redux checks.
    if (!action.type.includes('@@redux')) {
        console.log(' ');
        console.log('COURSE Reducer');
        console.log('current state', state);
        console.log('action', action);
    }

    switch (action.type) {

        case 'BLACKJACK_STATUS_LOADED': {

            console.log('@@@@@ chegou aqui', action.payload)

            return {
                status: 'succeeded',
                data: action.payload
            };
        };

        case 'BLACKJACK_STATUS_LOADING': {

            return {
                ...state,
                status: 'loading'
            };
        };

        case 'BLACKJACK_STATUS_FAILED': {

            return {
                ...state,
                status: 'failed'
            };
        };

        default:

            return state;
    };
};

export default blackjackStatusReducer;