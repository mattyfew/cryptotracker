import { GET_EXCHANGE_INFO } from './types'
import axios from 'axios'

// TODO: turn into redux thunk
const ROOT_URL = 'http://localhost:8080'

function getExchangeInfo() {
    //will need to add logged in user credentials

    return (dispatch) => {
        return axios.get('/get-exchange-info')
            .then( res => {
                console.log("we here");
                dispatch({
                    type: GET_EXCHANGE_INFO,
                    exchangeInfo: res.data.exchangeInfo
                })
            })
    }


}

export default {
  getExchangeInfo
}
