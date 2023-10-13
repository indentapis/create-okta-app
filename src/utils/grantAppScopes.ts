import axios from 'axios'
import { AxiosResponse } from 'axios'

export async function grantAppScopes(
  oktaDomain: string,
  oktaToken: string,
  clientId: string,
  scopeId: string
): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'post',
    url: `https://${oktaDomain}/api/v1/apps/${clientId}/grants`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `SSWS ${oktaToken}`,
    },
    data: {
      scopeId,
      issuer: `https://${oktaDomain}`,
    },
  }).then((r) => {
    console.log(`Added ${scopeId} to this app's allowed scopes`)
    return r.data
  })
}
