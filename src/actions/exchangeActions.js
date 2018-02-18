import { GET_EXCHANGE_INFO, ADD_NEW_EXCHANGE } from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:8080'

function getExchangeInfo() {
    // TODO: will need to add logged in user credentials
    return (dispatch) => {
        return axios.get('/exchanges/get-exchange-info')
            .then( res => {
                console.log("we here", res);
                dispatch({
                    type: GET_EXCHANGE_INFO,
                    exchangeInfo: res.data.exchangeInfo
                })
            })
    }
}

function addNewExchange(exchangeInfo) {
    return (dispatch) => {
        axios.post('/exchanges/add-new-exchange', exchangeInfo)
            .then(res => {
                console.log("we got something back", res)
                dispatch({
                    type: ADD_NEW_EXCHANGE
                })
            })
            .catch(err => console.log("there was an error in POST /add-new-exchange", err) )
    }
}

function getLogos() {
    return (dispatch) => {
        return axios.get('https://www.cryptocompare.com/api/data/coinlist/')
            .then( res => {
                console.log("getting logos", res)
            })
    }
}

export default {
  getExchangeInfo,
  addNewExchange,
  getLogos
}
