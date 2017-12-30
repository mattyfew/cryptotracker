import * as type from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
    case type.AUTH_USER:
        return { ...state, error: '', authenticated: true }

    return state;
}
