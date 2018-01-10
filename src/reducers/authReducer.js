import * as type from '../actions/types';

const initialState = {
  addressUser: '',
  addressSignature: ''
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

    switch (action.type) {

      case type.AUTH_USER:
        return { ...state, error: '', authenticated: true }

      case type.LOGIN:
        updated['addressUser'] = action.address
        return updated

      case type.VERIFY_SIGNATURE:
        updated['addressSignature'] = action.addressSignature
        return updated

      default:
        return state
    }
}
