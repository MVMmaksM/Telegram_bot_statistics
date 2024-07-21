const config = require('./config/app.conf');
const getStatistics = require('./service/statistics/statistics.js');
const isAuth = require('./service/authentication/auth.js');
const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf(config.bot_api_token);

bot.start((context)=> {
    context.reply("Введите пароль:");
})

bot.use(async(context, next)=>{
    if(isAuth(context.message.text)){
        next();
        return;
    }
    await context.telegram.sendMessage(context.message.chat.id, "Неверный пароль");
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