const config = require('./config/app.conf');
const getStatistics = require('./service/statistics/statistics.js');
const isAuth = require('./service/authentication/auth.js');
const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf(config.bot_api_token);
const createInstance = require('./db/createInstance.js');
const Server = require('./db/serverRepository/serverRepository.js');
const showLogIncomigMessage = require('./service/logs/logger.js');

global.instance = createInstance();

bot.start((context)=> {
    context.reply(`Введите логин и пароль в формате "логин пароль":`);
})

bot.use(async(context, next)=>{
    showLogIncomigMessage(context.message);
    
    const resAuth = await isAuth(global.instance, context.message.text);

    if(resAuth){       
        next();
    }else{
        await context.telegram.sendMessage(context.message.chat.id, "Неверный логин или пароль");
    }   
});

bot.use(async(context, _)=>{
    const servers = await Server.getAllServers(global.instance);

    for (let i=0; i<servers.length; i++){
        const res = await getStatistics(servers[i]);
        await context.telegram.sendMessage(context.message.chat.id, res);
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

