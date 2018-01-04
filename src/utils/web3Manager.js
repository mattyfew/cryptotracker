import Web3 from 'web3'
import ethUtil from 'ethereumjs-util'

export default {
  test: 'testing',
  getWeb3: () => {
    return new Promise((resolve, reject) => {
      window.addEventListener('load', function() {
        var web3 = window.web3
        if(typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider)
          resolve(web3)
        } else {
          //start testrc to usw this
          console.log('NO METAMASK')
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
          web3 = new Web3(provider)
          resolve(web3)
        }
      })
    })
  },
  signString: (string, web3) => {
    return new Promise((resolve, reject) => {
      const data = toHex(string)
      web3.eth.getAccounts()
      .then((res) => {
        console.log('ACCOUNT: ', res)
        web3.currentProvider.send({
          id: 1,
          method: 'personal_sign',
          params: [res[0], data]
        }, function(err, result) {
          let sig = result.result
          console.log('CALLBACK SIGNATURE: ', sig)
          resolve(sig)
        })
      })
      .catch((err) => console.log('ERROR: ', err))
    })
  }
}

function toHex(string) {
  let hex = ''
  for(var i=0; i<string.length; i++) {
    hex += '' + string.charCodeAt(i).toString(16)
  }
  return `0x${hex}`
}

// makeSig(dispatch) {
//
//  // function toHex(s) {
//  //   var hex = ‘’;
//  //   for(var i=0; i<s.length; i++) {
//  //     hex += ‘’+s.charCodeAt(i).toString(16);
//  //   }
//  //   return `0x${hex}`;
//  // }
//
//  var data = toHex(‘i am a string’)
//
//  web3.currentProvider.sendAsync({ id: 1,
//    method: 'personal_sign',
//    params: [web3.eth.accounts[0], data]
//  },
//    function(err, result) {
//      let sig = result.result;
//      dispatch(exchange.authenticate(sig, user))
//     })
//   }
// }
