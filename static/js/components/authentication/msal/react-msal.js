// eslint-disable-next-line
import React from 'react';
import {authConfig} from "Components/authentication/msal/settings";
import * as Msal from "msal";


/* Authentication logic */

function isAuthenticated() {
    try {
      let idToken = getIdToken();
      if (idToken) {
        idToken = decodeJWT(idToken);
        
        /* REGION get token exp date object */
        let tokenExp = new Date(0);
        tokenExp.setUTCSeconds(parseInt(idToken.exp));
        /* ENDREGION get token exp date object */

        if (tokenExp > new Date()){
            return true;
        }
      }
    } catch (err) {
      console.error(err);
    }

    return false;
}

function login() {
  /* region log the user in if not a callback from Microsoft */
  if (window === window.parent &&
      userAgentApplication && 
      !userAgentApplication.isCallback(window.location.hash))
  {
      msalGetToken().then(() => {
        /* region if id_token is expired, refresh it */
        if (!isAuthenticated()) {
          userAgentApplication.acquireTokenSilent([authConfig.clientID], null);
        }
        /* endregion if id_token is expired, refresh it */
      }).catch(err => {
        let errMessage = err.toString();

        /* region Authentication failure */
        if (errMessage.includes("interaction_required")) {
          alert(err);
        }
        /* endregion Authentication failure */
        
        /* region Signin user */
        userAgentApplication.loginRedirect(authConfig.scopes);
        /* endregion Signin user */
      });
  }
  /* endregion log the user in if not a callback from Microsoft */
}

function authCallback(errorDesc, token, error, tokenType) {
  /* region error retrieving token, display in console for troubleshooting */
  if (!token) {
    console.error(error + ":" + errorDesc);
  }
  /* endregion error retrieving token, display in console for troubleshooting */
}

export const userAgentApplication = new Msal.UserAgentApplication(
    authConfig.clientID, authConfig.authority, authCallback, authConfig
);


/* Application invocation with login */

export function runWithMsal(app, doNotLogin) {
  /* region load the application, force login if doNotLogin not specified */
  if (!doNotLogin) { login() };
  app(); //Start the app
  /* endregion load the application, force login if doNotLogin not specified */
}

/* Request handlers */

export function msalFetch(fetch, url, options) {
  /* region invoke a request using access and id token in header */
  return getAccessToken().then(accessToken => {
      let idToken = getIdToken();

      const o = options || {};
      if (!o.headers) o.headers = {};
      o.headers.Authorization = `Bearer ${accessToken}`;
      o.headers["x-ms-token-aad-id-token"] = idToken;
      return fetch(url, o);
  });
  /* endregion invoke a request using access and id token in header */
}

export function msalFetchNoAuth(fetch, url, options) {
  /* region invoke a request only using id_token, no Authorization token */
  let idToken = getIdToken();
  const o = options || {};
  if (!o.headers) o.headers = {};
  o.headers["x-ms-token-aad-id-token"] = idToken;
  return fetch(url, o);
  /* endregion invoke a request only using id_token, no Authorization token */
}


/* Helpers */

export const decodeJWT = (token) => {
  /* region decode a jwt token and parse into json object */
  let tokenChunk = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(tokenChunk));
  /* endregion decode a jwt token and parse into json object */
}

/* region get a access_token using msal */
export const msalGetToken = () => userAgentApplication.acquireTokenSilent(authConfig.scopes);
/* endregion get a access_token using msal */

/* region wrapper function for msalGetToken */
export const getAccessToken = () => msalGetToken();
/* endregion wrapper function for msalGetToken */

/* region get the id_token from cache */
export const getIdToken = () => userAgentApplication._cacheStorage.getItem(Msal.Constants.idTokenKey);
/* endregion get the id_token from cache */

/* region get the signed in user's information (ulimately from token) */
export const getUser = () => userAgentApplication.getUser();
/* endregion get the signed in user's information (ulimately from token) */

/* region get the signed in user's information (ulimately from token) */
export const logout = () => userAgentApplication.logout();
/* endregion get the signed in user's information (ulimately from token) */