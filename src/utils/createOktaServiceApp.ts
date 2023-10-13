import axios from 'axios'
import { KeyObject } from 'crypto'

export async function createOktaServiceApp(
  oktaDomain: string,
  oktaToken: string,
  oktaAppName: string,
  key: KeyObject,
  kid?: string
) {
  // Add a key ID
  const signingKey = { ...key, kid, use: 'sig' }

  return await axios({
    method: 'post',
    url: `https://${oktaDomain}/oauth2/v1/clients`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `SSWS ${oktaToken}`,
    },
    data: {
      client_name: oktaAppName,
      response_types: ['token'],
      grant_types: ['client_credentials'],
      token_endpoint_auth_method: 'private_key_jwt',
      application_type: 'service',
      jwks: {
        keys: [signingKey],
      },
    },
  }).then((r) => r.data?.client_id)
}
