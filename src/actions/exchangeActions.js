import { GET_EXCHANGE_INFO, ADD_NEW_EXCHANGE } from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:8080'

function getExchangeInfo() {
    // TODO: will need to add logged in user credentials
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

function addNewExchange(exchangeInfo) {
    return (dispatch) => {
        axios.post('/add-new-exchange', exchangeInfo)
            .then(res => {
                console.log("we got something back", res)
                dispatch({
                    type: ADD_NEW_EXCHANGE
                })
            })
            .catch(err => console.log("there was an error in POST /add-new-exchange", err) )
    }
}

export default {
  getExchangeInfo,
  addNewExchange
}
