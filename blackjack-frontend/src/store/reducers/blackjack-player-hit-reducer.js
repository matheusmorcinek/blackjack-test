export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
};

const blackjackPlayerHitReducer = (state = INITIAL_STATE, action) => {

    //removing unnecessary console logs, the first reducers calls are just the Redux checks.
    // if (!action.type.includes('@@redux')) {
    //     console.log(' ');
    //     console.log('COURSE Reducer');
    //     console.log('current state', state);
    //     console.log('action', action);
    // }

    switch (action.type) {

        case 'BLACKJACK_PLAYER_HIT_LOADED': {

            return {
                status: 'succeeded'
            };
        };

        case 'BLACKJACK_PLAYER_HIT_LOADING': {

            return {
                status: 'loading'
            };
        };

        case 'BLACKJACK_PLAYER_HIT_FAILED': {

            return {
                status: 'failed'
            };
        };

        default:

            return state;
    };
};

export default blackjackPlayerHitReducer;