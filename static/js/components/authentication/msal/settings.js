export const authConfig = {
    authority: "https://login.microsoftonline.com/{{TENANT NAME HERE}}",
    clientID: '', //Put app client ID here
    cacheLocation: 'localStorage',
    scopes: [
    	"https://graph.microsoft.com/.default"
    ]
};
