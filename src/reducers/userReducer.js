import * as type from '../actions/types';

const initialState = {
  dbID: '',
  addressUser: '',
  addressSignature: '',
  errorMsg: '',
  userData: []
}

export default (state = initialState, action) => {

    switch (action.type) {

      case type.AUTH_USER:
        return {
          ...state, error: '',
          authenticated: true
        }

      case type.LOGIN:
        return {
          ...state,
          addressUser: action.address
        }

      case type.VERIFY_SIGNATURE:
        return {
          ...state,
          addressSignature: action.addressSignature
        }

      case type.SAVE_USER_ADDRESS:
        if(action.response.confirmation === 'success') {
          return {
            ...state,
            dbID: action.response.result._id,
            errorMsg: ''
          }
        } else {
          return {
            ...state,
            errorMsg: 'Could not update user properly.'
          }
        }

      case type.GET_USER_INFO:
        if (state.dbID.length === 0 || state.addressUser.length === 0) {
          return {
            ...state,
            dbID: action.userInfo._id,
            addressUser: action.userInfo.userID,
            userData: action.userInfo
          }
        } else {
          return {
            ...state,
            userData: action.userInfo
          }
        }

      default:
        return state
    }
}
