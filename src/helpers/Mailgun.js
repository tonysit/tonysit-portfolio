const formData = require('form-data');
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: process.env.REACT_APP_MAILGUN_API_KEY});

export const send = async (to, subject, text) => {
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