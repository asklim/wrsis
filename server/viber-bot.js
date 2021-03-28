const ViberBot = require( 'viber-bot' ).Bot;
const BotEvents = require( 'viber-bot' ).Events;
const TextMessage = require( 'viber-bot' ).Message.Text;

const {
    consoleLogger,
} = require( './helpers' );
const log = consoleLogger( 'mikaV' );

const bot = new ViberBot({
    logger:  console,
    authToken: process.env.VIBER_CHAT_TOKEN,
    name: '', //"Avangard V Bot",
    avatar: ''//"https://share.cdn.viber.com/pg_download?id=0-04-01-d79d69e99e9191e508631e0ee1db66536a67120c391571fc42a8d8ca10193193&filetype=jpg&type=icon"
    //avatar: "../src/assets/img/reactlogo.png"
    //avatar: "https://dl-media.viber.com/1/share/2/long/vibes/icon/image/0x0/3193/d79d69e99e9191e508631e0ee1db66536a67120c391571fc42a8d8ca10193193.jpg"
});


bot.on( BotEvents.SUBSCRIBED, (response) => {

    response.send( 
        new TextMessage( 
            `Hi there ${response.userProfile.name}. I am ${bot.name}!` 
        ));
});


bot.on( BotEvents.MESSAGE_RECEIVED, (message, response) => {
    try {
        const botAnswer = {
            text : () => {
                response.send( new TextMessage(
                    `Message ${message.text} received.` 
                ));
            },
            default: () => response.send( new TextMessage(
                `На Такие Сообщения Я НЕ Отвечаю.` 
            )),
        };
        (botAnswer[ message.type.toLowerCase() ] || botAnswer[ 'default' ])();
    }
    catch (error) {
        log.error( 'handler:on(message)', error );
    }
});


module.exports = { bot };
