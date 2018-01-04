import * as type from '../actions/types';

const initialState = {
  user: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

    switch (action.type) {

      case type.AUTH_USER:
        return { ...state, error: '', authenticated: true }

      case type.LOGIN:
        console.log('REDUCER LOGIN')
        updated['user'] = action.user
        return updated

      default:
        return state
    }
}
