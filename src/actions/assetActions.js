import { GET_ASSET_INFO } from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:8080'

function getAssetInformation() {
  return (dispatch) => {
    return axios.get('/resources/asset-information')
      .then((res) => {
        dispatch({
          type: GET_ASSET_INFO,
          result: res.data
        })
      })
  }
}

export default {
    getAssetInformation
}
