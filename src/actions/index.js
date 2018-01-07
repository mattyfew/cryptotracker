import axios from 'axios'
import { GET_EXCHANGE_INFO } from './types';

const ROOT_URL = 'http://localhost:8080'

export function getExchangeInfo() {
    //will need to add logged in user credentials

    return axios.get('/get-exchange-info')
        .then( res => {
            return {
                type: GET_EXCHANGE_INFO,
                exchangeInfo: res.data.exchangeInfo
            }
        })
}
