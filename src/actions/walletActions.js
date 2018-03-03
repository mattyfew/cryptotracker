import { GET_WALLET_INFO, ADD_NEW_WALLET } from './types'
import axios from 'axios'


function getWalletInfo() {
    return (dispatch) => {
        return axios.get('/wallets/get-wallet-info')
            .then( res => {
                dispatch({
                    type: GET_WALLET_INFO,
                    walletInfo: res.data.walletInfo
                })
            })
            .catch(err => console.log("there was an error in GET /get-wallet-info", err) )

    }
}

function addNewWallet(walletInfo) {
    return (dispatch) => {
        axios.post('/wallets/add-new-wallet', walletInfo)
            .then(res => {
                console.log("we got something back", res)
                dispatch({
                    type: ADD_NEW_WALLET
                })
            })
            .catch(err => console.log("there was an error in POST /add-new-wallet", err) )
    }
}


export default {
  getWalletInfo,
  addNewWallet
}
