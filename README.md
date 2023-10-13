# Create Okta Service App

A starter to create an Okta OAuth2.0 Service app via Okta's API.

### Requirements

- [Okta Account](https://okta.com)
- [Okta API Token](https://help.okta.com/en/prod/Content/Topics/Security/API.htm?cshid=Security_API#)
- [Node `v16+`](https://nodejs.org/dist/latest-v16.x/docs/api/)
- Optional: [Okta's guide to creating a Service App](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/overview/)

### Setup

Clone this repo:

```bash
git clone https://github.com/indent-testing/create-okta-app.git \
cd create-okta-app
```

Install the dependencies:

```bash
npm install
```

Build the Node file into a binary:

```bash
npm run build && npm link
```

### Usage

Make sure you have access to your Okta Domain URL and your Okta Admin API Token.

Use the app like this:

```bash
create-okta-app --domain DOMAIN.okta.com --scopes "okta.users.manage,okta.groups.manage,okta.apps.read" --token TOKEN --name indent-access-service-app
```

Or use `npx` to do in one line:

```bash
npx create-okta-app --domain DOMAIN.okta.com --scopes "okta.users.manage,okta.groups.manage,okta.apps.read" --token TOKEN --name indent-access-service-app
```
