import axios from "axios";
import { msalFetch } from 'Components/authentication/msal/react-msal';

export default async function recursiveRequest(uri, objs=[], limit) {
    return msalFetch(axios, uri, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async response => {
        var data = response.data.value;
        let i = 0; const iMax = data.length;
        if (iMax > 0) {
            for(; i < iMax; i++) {
                objs.push(data[i]);
            }

            //@odata.nextLink load next recursivly
            if (!(limit != undefined && objs.length >= limit)) {
                if (response.data["@odata.nextLink"]) {
                    objs = await recursiveRequest(response.data["@odata.nextLink"], objs, limit)
                }
            }

            return objs
        }
    })
}