const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;

const bot = new ViberBot({
  authToken: process.env.VIBER_CHAT_TOKEN,
  name: "MIKA Vitebsk",
  avatar: "../src/assets/img/reactlogo.png"
});

bot.on( BotEvents.SUBSCRIBED, response => {
  response.send( new TextMessage( `Hi there ${response.userProfile.name}. I am ${bot.name}!` ));
});

bot.on( BotEvents.MESSAGE_RECEIVED, (message, response) => {
  response.send( new TextMessage(`Message ${message} received.` ));
});

module.exports = bot;
