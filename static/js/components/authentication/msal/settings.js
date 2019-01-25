export const authConfig = {
	authority: "https://login.microsoftonline.com/c3e32f53-cb7f-4809-968d-1cc4ccc785fe",
    clientID: '', //Put app client ID here
    cacheLocation: 'localStorage',
    scopes: [
    	"https://graph.microsoft.com/user_impersonation"
    ]
};