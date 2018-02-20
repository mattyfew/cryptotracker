const crypto = require('crypto')
const scrypt = require('scrypt-async')


export default class EncryptionAgent {
  async encrypt({password, plaintext}) {
    const salt = crypto.randomBytes(32).toString('hex')
    const key = await _constructKey({password, salt})

    const cipher = crypto.createCipher('aes-256-ctr', key)
    let crypted = cipher.update(plaintext,'utf8','hex')
    crypted += cipher.final('hex');
    return {cipertext: crypted, salt}
  }

  async decrypt({ciphertext, salt, password}) {
    const key = await _constructKey({password, salt})
    const decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(ciphertext,'hex','utf8')
    dec += decipher.final('utf8');
    return {plaintext: dec}
  }


  _constructKey({password, salt}) {
    return new Promise((resolve, reject) => {
      const kdfParams = {
        derivationKeyLength: 32,
        salt: salt,
        n: 262144,
        r: 8,
        p: 1
      }

      return scrypt(password, salt, {
        N: kdfParams.n,
        r: kdfParams.r,
        p: kdfParams.p,
        dkLen: kdfParams.derivationKeyLength,
        interruptStep: 1000,
        encoding: 'hex'
        },
        derivedKey => resolve({derivedKey})
      )
    })
  }
}
