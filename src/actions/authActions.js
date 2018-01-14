import axios from 'axios'
import * as type from './types'
import { web3Manager } from '../utils'

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
    })
    .catch((err) => {
      console.log('ERROR IN VERIY SIGNATURE: ', err)
    })
  }
}

export default {
  login,
  verifySignature
}
