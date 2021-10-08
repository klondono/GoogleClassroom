const OktaAuth = require('@okta/okta-auth-js').OktaAuth
const authClient = new OktaAuth({
  issuer: 'https://dev-76008699.okta.com',
  clientId: '0oa23zxice9Iv22M15d7',
  scopes: ['openid', 'email', 'profile'],
  redirectUri: window.location.origin + '/login/callback'
})

export default {
    login (email, pass, cb) {
      cb = arguments[arguments.length - 1]
      if (localStorage.token) {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      return authClient.signInWithCredentials({
        username: email,
        password: pass
      }).then(transaction => {
        if (transaction.status === 'SUCCESS') {
          return authClient.token.getWithoutPrompt({
            responseType: ['id_token', 'token'],
            sessionToken: transaction.sessionToken,
          }).then(response => {
            localStorage.token = response.tokens.accessToken
            localStorage.idToken = response.tokens.idToken
            if (cb) cb(true)
            this.onChange(true)
          })
        }
      }).catch(err => {
        console.error(err.message)
        if (cb) cb(false)
        this.onChange(false)
      })
    },
  
    getToken () {
      return localStorage.token
    },
  
    logout (cb) {
      delete localStorage.token
      delete localStorage.idToken
      if (cb) cb()
      this.onChange(false)
      return authClient.signOut()
    },
  
    loggedIn () {
      return !!localStorage.token
    },
  
    onChange () {
    }
  }