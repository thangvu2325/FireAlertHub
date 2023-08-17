const sendSMS = ({ body, phone }) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  console.log(phone);
  client.messages
    .create({
      body: body,
      to: `+84${phone.slice(1)}`, // Text your number
      from: "+12515819052", // From a valid Twilio number
    })
    .then((message) => {
      //   console.log(message);
    });
};
module.exports = sendSMS;
