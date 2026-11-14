const formData = require('form-data');
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const apiKey = process.env.REACT_APP_MAILGUN_API_KEY;
const client = apiKey ? mailgun.client({username: 'api', key: apiKey}) : null;

export const send = async (to, subject, text) => {
    if (!client || !process.env.REACT_APP_MAILGUN_DOMAIN) {
        console.error('Mailgun is not configured.');
        return false;
    }

    const messageData = {
        from: `${process.env.REACT_APP_MAILGUN_USER} <no-reply@${process.env.REACT_APP_MAILGUN_DOMAIN}>`,
        to, 
        subject, 
        text
    };

    try{
        const res = client.messages.create(process.env.REACT_APP_MAILGUN_DOMAIN, messageData)
        return res;
    }catch(err){
        console.error(err);
        return false;
    }
}
