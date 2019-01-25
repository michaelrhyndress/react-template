import axios from "axios";
import { msalFetch } from 'Components/authentication/msal/react-msal';
import DefaultAppLogo from "Images/Default_Application_Logo.png"

export default async function getAppLogoUrl(appId) {
    let request = `https://graph.microsoft.com/beta/applications?$filter=appId+eq+'${appId}'&$top=1&$select=info`
    return msalFetch(axios, request, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return Promise.resolve(response.data.value[0].info.logoUrl || DefaultAppLogo)
    })
    .catch(error => {
        console.error(appId + ": " + error)
        return Promise.resolve(DefaultAppLogo)
    })
}