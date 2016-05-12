import * as ActionTypes from '../constants/ActionTypes';

const defaultScreen = 'loading';

function screen(state = defaultScreen, action) {
    switch (action.type) {
        case ActionTypes.SCREEN_CHANGED:
            return action.screen;
            break;
        default:
            return state;
    }
}

export default screen;