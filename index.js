const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = new twilio(accountSid, authToken);

const whatsappNumber = 'your_whatsapp_phone_number';

app.post('/whatsapp', (req, res) => {
  const { Body, From } = req.body;
  const message = Body.trim().toLowerCase();

  switch (message) {
    case 'hello':
      client.messages
        .create({
          from: whatsappNumber,
          to: From,
          body: 'Hello! How can I assist you today?',
        })
        .done();
      break;

    case 'help':
      client.messages
        .create({
          from: whatsappNumber,
          to: From,
          body: 'Available commands: hello, help, about',
        })
        .done();
      break;

    case 'about':
      client.messages
        .create({
          from: whatsappNumber,
          to: From,
          body: 'I\'m MrClay06\'s WhatsApp bot!',
        })
        .done();
      break;

    default:
      client.messages
        .create({
          from: whatsappNumber,
          to: From,
          body: 'Unknown command. Type "help" for assistance.',
        })
        .done();
  }

  res.status(200).send('Message received!');
});

app.listen(3000, () => {
  console.log('WhatsApp bot listening on port 3000!');
});
```
