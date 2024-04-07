export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
    hitCount: 0,
};

const blackjackPlayerHitReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'BLACKJACK_PLAYER_HIT_LOADED': {

            return {
                status: 'succeeded',
                hitCount: state.hitCount + 1
            };
        };

        case 'BLACKJACK_PLAYER_HIT_LOADING': {

            return {
                ...state,
                status: 'loading'
            };
        };

        case 'BLACKJACK_PLAYER_HIT_FAILED': {

            return {
                ...state,
                status: 'failed'
            };
        };

        case 'BLACKJACK_PLAYER_HIT_RESET': {
            return INITIAL_STATE;
        };

        default:

            return state;
    };
};

export default blackjackPlayerHitReducer;