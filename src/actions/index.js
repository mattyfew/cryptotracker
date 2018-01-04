import axios from 'axios'
import * as type from './types';
import { web3Manager } from '../utils'

const ROOT_URL = 'http://localhost:8080'

// export function getAccounts() {
//     return {
//         type: type.GET_ACCOUNTS
//     }
// }

export default{
  getAccounts: () => {

  },

  login: async () => {
    console.log('IN ACTION LOGIN')
    web3Manager.getWeb3()
    .then((web3) => {
      web3Manager.signString('hello test test', web3)
    })
    .then((result) => {
      // console.log('RESULT SIGN STRING: ', result)
    })

    // const test = await web3Manager.getWeb3()
    return (dispatch) => {
      //sign random string login here
      dispatch({
        type: type.LOGIN,
        user: 'test natascha user'
      })
    }
  }

}
