#!/usr/bin/env node

import axios from 'axios'
import yargs from 'yargs/yargs'

import { createKeyPair } from './utils/createKeyPair'
import { createOktaServiceApp } from './utils/createOktaServiceApp'
import { grantAppScopes } from './utils/grantAppScopes'

const parser = yargs(process.argv.slice(2)).options({
  domain: {
    type: 'string',
    demandOption: true,
    describe: 'Your Okta API Domain, e.g. https://example.okta.com',
  },
  token: {
    type: 'string',
    demandOption: true,
    describe: 'Your Okta Admin API Token',
  },
  name: {
    type: 'string',
    default: 'okta_service_app',
    describe: `Optional: The name of your new Okta app, defaults to 'okta_service_app'`,
  },
  scopes: {
    type: 'string',
    describe: 'Enter a valid scope from the Okta API',
    default: 'okta.users.manage,okta.groups.manage,okta.apps.read',
  },
  keysize: {
    type: 'number',
    default: 2048,
    describe: `Optional: The number of bits for your RSA key, defaults to 2048`,
  },
  keyid: {
    type: 'string',
    default: '1000001',
    describe: `Optional: The key ID you want to use for your app, defaults to '1000001'`,
  },
  clientid: {
    type: 'string',
    describe: `Optional: The client ID of an existing app to grant API scopes`
  }
})

async function createAppAndScopes() {
  const argv = await parser
    .scriptName('create-okta-app')
    .usage('Usage: $0 [options]')
    .help('h')
    .alias('h', 'help').argv

  const oktaDomain = trimUrl(argv.domain)
  const oktaToken = argv.token
  const oktaAppName = argv.name
  const kid = argv.keyid
  const keySize = argv.keysize
  const scopes = (argv.scopes|| '').split(',')

  console.log('Setting up the new Okta Service App...')
  console.log(argv)
  const key = await createKeyPair(keySize)

  try {
    const clientId = argv.clientid || await createOktaServiceApp(
      oktaDomain,
      oktaToken,
      oktaAppName,
      key,
      kid
    )

    if (clientId) {
      console.log(
        `App ${oktaAppName} successfully generated.\nYour client_id is ${clientId}\n`
      )
      await Promise.all(
        scopes.map((s: string) =>
          grantAppScopes(oktaDomain, oktaToken, clientId, s)
        )
      )
    }
  } catch (err) {
    console.error(`@indent/create-okta-app: createAppAndScopes: failed`)
    if (axios.isAxiosError(err)) {
      console.error(err?.response?.data)
    }
  }
}

createAppAndScopes()

const trimUrl = (url: string) => {
  if (url.includes('https://')) {
    return url.substring('https://'.length)
  }

  return url
}
