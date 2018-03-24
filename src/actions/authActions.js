import axios from 'axios'
import * as type from './types'
import { web3Manager } from '../utils'
import { push } from 'react-router-redux'

// method # 1 - everything undefined wtf?
// import * as actions from './index'
// console.log(actions);
// const { getExchangeInfo } = ExchangeActions
// const { getWalletInfo } = WalletActions
// const { getCoinInfo } = CoinActions
// console.log(getExchangeInfo, getWalletInfo, getCoinInfo);

// method #2
import CoinActions from './coinActions'
import WalletActions from './walletActions'
import ExchangeActions from './exchangeActions'
const { getExchangeInfo } = ExchangeActions
const { getWalletInfo } = WalletActions
const { getCoinInfo } = CoinActions

const ROOT_URL = 'http://localhost:8080'

const login = () => {
  return (dispatch, getState) => {
    web3Manager.getWeb3()
    .then((web3) => {
      web3Manager.signString('hello test test', web3)
      .then((response) => {
        dispatch({
          type: type.LOGIN,
          address: response.account
        })
        return dispatch(verifySignature(response.sig))
      })
    })
    .catch((err) => {
      console.log('ERROR ACTION LOGIN: ', err)
    })
  }
}

const verifySignature = (signature) => {
  return (dispatch, getState) => {
    web3Manager.getWeb3()
    .then((web3) => {
      return web3Manager.verifySignature(signature, 'hello test test')
    })
    .then((res) => {
      dispatch({
        type: type.VERIFY_SIGNATURE,
        addressSignature: res
      })
      return dispatch(saveUserAddress())
    })
    .catch((err) => {
      console.log('ERROR in verify signature: ', err)
    })
  }
}

const saveUserAddress = () => {
  return (dispatch, getState) => {
    const userAddress = getState().auth.addressSignature
    return axios.post(`/api/update/user`, {attribute: 'userID', value: userAddress})
    .then((res) => {
      dispatch({
        type: type.SAVE_USER_ADDRESS,
        response: res.data
      })

      axios.post('/authenticate', {id: res.data.result._id})
      .then((res) => {
        dispatch(push('/wallet'))
        return res
      })
    })
    .catch((err) => {
      console.log('ERROR save user address: ', err)
    })
  }
}

const getUserInfo = () => {

    return (dispatch, getState) => {
        if (!getState().auth.addressUser) {
            return axios.get('/authenticate/get-user-info')
            .then(res => {
                return axios.get(`/api/user/${res.data.addressUser}`)
                .then(res => {
                    return dispatch({
                        type: type.GET_USER_INFO,
                        userInfo: res.data.results
                    })
                })
            })
            .catch(err => console.log('ERROR get user info: ', err))
        }
    }
}

const getUserInfoAndResources = () => {
    return (dispatch, getState) => {
        return dispatch(getUserInfo()).then(() => {
            const userID = getState().auth._id
            console.log("after getUserInfo",userID );
            return Promise.all([
                dispatch(getExchangeInfo()),
                dispatch(getCoinInfo()),
                dispatch(getWalletInfo())
            ]).then(() => {
                console.log("all these ran");
            })
        })
    }
}


export default {
  login,
  verifySignature,
  saveUserAddress,
  getUserInfo,
  getUserInfoAndResources
}
