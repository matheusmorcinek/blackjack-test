export const INITIAL_STATE = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
};

const blackjackPlayerStandReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'BLACKJACK_PLAYER_STAND_LOADED': {

            return {
                status: 'succeeded'
            };
        };

        case 'BLACKJACK_PLAYER_STAND_LOADING': {

            return {
                status: 'loading'
            };
        };

        case 'BLACKJACK_PLAYER_STAND_FAILED': {

            return {
                status: 'failed'
            };
        };

        default:

            return state;
    };
};

export default blackjackPlayerStandReducer;