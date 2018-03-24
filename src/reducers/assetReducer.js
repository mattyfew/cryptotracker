import { GET_ASSET_INFO, GET_EXCHANGE_RATES } from '../actions/types'


const initialState = {
  assetInformation: []
}



export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ASSET_INFO:
      return {...state, assetInformation: action.result.result}

    default:
      return state
  }
}
