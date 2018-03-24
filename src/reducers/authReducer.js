import * as type from '../actions/types';

const initialState = {
  addressUser: '',
  addressSignature: '',
  errorMsg: ''
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

      case type.SAVE_USER_ADDRESS:
        if(action.response.confirmation === 'success') {
          return state
        } else {
          updated['errorMsg'] = 'Could not update user properly.'
          return updated
        }
        return state

      case type.GET_USER_INFO:
        updated['addressUser'] = action.userInfo._id
        return updated

      default:
        return state
    }
}
