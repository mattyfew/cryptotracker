const express = require('express')
  router = express.Router();
const ethUtil = require('ethereumjs-util')
// router.get('/', (req,res)=>{
//   res.render('home')
// })
//
// router.post('/signup', (req,res)=>{
//   // run your post route
// })
router.post('/auth', (req, res) => {
  const data = 'I am a string'
  checkSignature({
    sig: req.sig,
    owner: req.owner,
    data: data
  })
})

module.exports = router


function checkSignature({sig, owner, data}) {
  const message = ethUtil.toBuffer(data)
  const msgHash = ethUtil.hashPersonalMessage(message)

  // Get the address of whoever signed this message
  const signature = ethUtil.toBuffer(sig)
  const sigParams = ethUtil.fromRpcSig(signature)
  const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
  const sender = ethUtil.publicToAddress(publicKey)
  const addr = ethUtil.bufferToHex(sender)

  // Determine if it is the same address as 'owner'
  let match = false
  if (addr == owner) {
    match = true
  }
}
