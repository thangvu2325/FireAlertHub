const sendSMS = ({ body, phone }) => {
  const accountSid = "AC26f3e3b786c4723f14a27e17f31d486c";
  const authToken = "c92f1b78cc0172fe76fa1bd031caf912";
  const client = require("twilio")(accountSid, authToken);
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
