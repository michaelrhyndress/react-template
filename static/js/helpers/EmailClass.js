import axios from "axios";
import { msalFetch } from 'Components/authentication/msal/react-msal';

export default class Email {
	constructor(subject,body,
				toRecipients,ccRecipients,
				saveToSentItems,contentType,
				importance) 
	{
		this.subject = subject || "Notification";
		this.body = body || ""
		this.toRecipients = toRecipients || [];
		this.ccRecipients = ccRecipients || [];
		this.saveToSentItems = saveToSentItems || false;
		this.contentType = contentType || "Text";
		this.importance = importance || "Normal";
		this.emailCache = [];
	}

	set addCcRecipient(email) {
		this.ccRecipients.push(email);
	}

	set addRecipient(email) {
		this.toRecipients.push(email);
	}

	json() {
		let emailAddressRegex = /^[a-zA-Z0-9.!£#$%&'^_`{}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+).$/;
		let toList = this.toRecipients.map(i => {
			return {
				"emailAddress": {
					"address": i
				}
			}
		});

		let message = {
			"message" : {
				"importance": this.importance,
				"subject": this.subject,
				"body": {
					"contentType": this.contentType,
					"content": this.body
				},
				"toRecipients": toList,
			},
			"saveToSentItems": this.saveToSentItems
		}

		if (Array.isArray(this.ccRecipients) && this.ccRecipients.length > 0) {
			message.message.ccRecipients = this.ccRecipients.filter(email => {
				return emailAddressRegex.test(String(email).toLowerCase());
			}).map(email => {
				return {"emailAddress": {"address": email}}
			})
		}

		return message
	}

	send() {
		/* REGION return a axios promise */
		const _thisEmail = msalFetch(axios, "sendMail", {
			method: "post",
			baseURL: "https://graph.microsoft.com/v1.0/me/",
			data: this.json(),
			headers: {
				"Content-Type": "application/json"
			}
		})

		this.emailCache.push(_thisEmail);
		return _thisEmail;
		/* ENDREGION return a axios promise */
	}
}