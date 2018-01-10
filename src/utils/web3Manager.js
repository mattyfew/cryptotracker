import Web3 from 'web3'
import ethUtil from 'ethereumjs-util'

export default {
  getWeb3: () => {
    return new Promise((resolve, reject) => {
      // window.addEventListener('load', function() { crates problem on action dispatch side
        var web3 = window.web3
        if(typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider)
          resolve(web3)
        } else {
          console.log('NO METAMASK')
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
          web3 = new Web3(provider)
          resolve(web3)
        }
      // })
    })
  },
  signString: (string, web3) => {
    return new Promise((resolve, reject) => {
      const data = toHex(string)
      web3.eth.getAccounts()
      .then((res) => {
        web3.currentProvider.send({
          id: 1,
          method: 'personal_sign',
          params: [res[0], data]
        }, function(err, result) {
          let sig = result.result
          const response = {
            sig: sig,
            account: res[0]
          }
          resolve(response)
        })
      })
      .catch((err) => console.log('ERROR: ', err))
    })
  },
  verifySignature: (signature, string) => {
    return new Promise((resolve, reject) => {
      const data = ethUtil.toBuffer(string)
      const msgHash = ethUtil.hashPersonalMessage(data)
      const sigParams = ethUtil.fromRpcSig(signature)
      const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
      const sender = ethUtil.publicToAddress(publicKey)
      const address = ethUtil.bufferToHex(sender)
      resolve(address)
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
