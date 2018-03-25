import { GET_WALLET_INFO, ADD_NEW_WALLET } from './types'
import axios from 'axios'


function getWalletInfo() {
    return (dispatch, getState) => {

        // NEED TO SEND OVER USER INFO THAT COMES FROM THE STATE

        return axios.get('/resources/wallet')
            .then( res => {
                console.log("running getWalletInfo", res);
                dispatch({
                    type: GET_WALLET_INFO,
                    walletInfo: res.data.walletInfo
                })
            })
            .catch(err => console.log("there was an error in getWalletInfo", err))
    }
}

function addNewWallet(walletInfo) {
    return (dispatch) => {
        axios.post('/resources/wallet', walletInfo)
            .then(res => {
                console.log("we got something back", res)
                dispatch({
                    type: ADD_NEW_WALLET
                })
            })
            .catch(err => console.log("there was an error in addNewWallet", err) )
    }
}


export default {
  getWalletInfo,
  addNewWallet
}
