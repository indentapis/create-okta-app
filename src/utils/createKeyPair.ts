import fs from 'fs/promises'
import { generateKeyPair } from 'crypto'
import { promisify } from 'util'

export async function createKeyPair(keySize: number = 2048) {
  // convert genkeypair to promise
  const generateAsyncKeyPair = promisify(generateKeyPair)

  // set options
  const keyOptions = {
    modulusLength: keySize,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'jwk',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  }
  // create key objects
  const { publicKey, privateKey } = await generateAsyncKeyPair(
    'rsa',
    keyOptions
  )

  setTimeout(
    () =>
      console.log(
        `Generating an RSA JSON Web Key with ${keySize} bits of entropy`
      ),
    500
  )

  return await fs
    .writeFile('okta_private_key.pem', `${privateKey}`)
    .then(() => {
      setTimeout(
        () =>
          console.log(
            `Keys successfully written to file "okta_private_key.pem"`
          ),
        500
      )
      return publicKey
    })
}
