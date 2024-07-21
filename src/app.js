const config = require('./config/app.conf');
const getStatistics = require('./service/statistics/statistics.js');
const isAuth = require('./service/authentication/auth.js');
const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf(config.bot_api_token);
const createInstance = require('./db/createInstance.js');

global.instance = createInstance();

bot.start((context)=> {
    context.reply(`Введите логин и пароль в формате "логин пароль":`);
})

bot.use(async(context, next)=>{
    const credentials = context.message.text.split(" ");

    if(credentials.length === 2){
        if(isAuth(credentials[0], credentials[1])){
            next();
            return;
        }
    }    
    await context.telegram.sendMessage(context.message.chat.id, "Неверный логин или пароль");
});

bot.use(async(context, _)=>{
    let res = await getStatistics(config.ip_master_server);
    await context.telegram.sendMessage(context.message.chat.id, res);

    res = await getStatistics(config.ip_replica_yandex_1);
    await context.telegram.sendMessage(context.message.chat.id, res);

    res = await getStatistics(config.ip_replica_yandex_2);
    await context.telegram.sendMessage(context.message.chat.id, res);
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

