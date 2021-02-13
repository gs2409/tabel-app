const express = require('express');
const cors = require('cors');
const hubspot = require('@hubspot/api-client')
const { WebClient } = require('@slack/web-api');
const fs = require('fs') // Filestream
const asana = require('asana');
const request = require("request"); /* https://www.npmjs.com/package/@hubspot/api-client */
const mongoose = require('mongoose');
const socketio = require('socket.io')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

io.on('connection', socket => {
  console.log("New user connected")
})

const uri = 'mongodb+srv://user:tabeltech@tabelcluster.oruvt.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// hubspot_owner_id : sloack_conversationId
slack_ids = {'59675290': 'U01MLMWLP41', '59289779' : 'U01M50V4JVB', '59674835': 'U01MLMWLP41'}

// SLACK CREDENTIALS
const token = 'xoxb-1722319530019-1719223115141-XfjTBI1A9iHwSjNZl3j4VSYt';
const conversationId = 'U01M50V4JVB'; // Madhu's ID

// ASANA CREDENTIALS
var client = asana.Client.create().useAccessToken('1/1199905259098990:06f3f1b4ed03b3a8ea1415cad042d4a2');

const web = new WebClient(token);
var newTask = { name: "Your Mission" };

// HUBSPOT CREDENTIALS
var options = {
  method: 'GET',
  url: 'https://api.hubapi.com/crm/v3/objects/contacts',
  qs: {limit: '10', properties: 'firstname, hubspot_owner_id', archived: 'false', hapikey: '4a962b90-2f0d-44da-99ab-953c196fbe9d'},
  headers: {accept: 'application/json'}
};

var contacts = null

// HUBSPOT API CALL - Fetch Contacts
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    contacts = JSON.parse(body)
    console.log(contacts.results)
    for (let contact of contacts.results){
      var hoi = contact.properties.hubspot_owner_id
      if(hoi != null){
        var cid = slack_ids[hoi]
        var name = JSON.stringify(contact.properties.firstname)
        var res = web.chat.postMessage({ channel: cid, text: 'hi' });
        console.log(name)
      }
    }
});

  // Push contacts to Express frontend
app.get('/', function (req, res) {
    res.send(contacts.results);
    
    // console.log(contacts)
});

// // Send message to Slack
// (async () => {
//     // See: https://api.slack.com/methods/chat.postMessage
//     const res = await web.chat.postMessage({ channel: conversationId, text: JSON.stringify(contacts.results) });
//     console.log('Message sent: ', res.ts);
// })();

// // Create a task in Asana
// client.tasks.createInWorkspace(1199905142799209, newTask).then(function(response) {
//     tasks = response;
//     // console.log(tasks);
// });

// const testRouter = require('./routes/test');
// app.use('/test', testRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});