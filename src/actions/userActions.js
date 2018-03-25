import axios from 'axios'
import * as type from './types'
import { web3Manager } from '../utils'
import { push } from 'react-router-redux'

const ROOT_URL = 'http://localhost:8080'

const login = () => {
  return (dispatch) => {
    web3Manager.getWeb3()
    .then((web3) => {
      web3Manager.signString('our app is awesome', web3)
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
  return (dispatch) => {
    web3Manager.getWeb3()
    .then((web3) => {
      return web3Manager.verifySignature(signature, 'our app is awesome')
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
    const userAddress = getState().user.addressSignature
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
    const { dbID } = getState().user

    return axios.get(`/api/user/${dbID}`)
    .then((res) => {
      return dispatch({
        type: type.GET_USER_INFO,
        userInfo: res.data.results
      })
    })
  }
}


export default {
  login,
  verifySignature,
  saveUserAddress,
  getUserInfo
}
