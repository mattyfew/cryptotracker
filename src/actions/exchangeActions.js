import { GET_EXCHANGE_INFO, ADD_NEW_EXCHANGE } from './types'
import axios from 'axios'

const ROOT_URL = 'http://localhost:8080'

function getExchangeInfo() {
    // TODO: will need to add logged in user credentials

    return (dispatch, getState) => {
        // const userMongoID = getState().auth._id
        // const exchanges = getState().auth.exchanges

        return axios.get(`/resources/exchange`)
            .then( res => {
                dispatch({
                    type: GET_EXCHANGE_INFO,
                    exchangeInfo: res.data.exchangeInfo
                })
            })
            .catch(err => console.log("there was an error in GET /resources/exchange", err) )
    }
}

function addNewExchange(exchangeInfo) {
    return (dispatch) => {
        axios.post('/resources/exchange', exchangeInfo)
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
