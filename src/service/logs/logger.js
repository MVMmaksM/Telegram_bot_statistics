function showLogIncomigMessage(contextMessage){
    let log = '-------------------------------------------'
    log += `\n[${new Date().toISOString()}]`;
    log += '\n[message_id]: ' + contextMessage?.message_id;
    log += '\n[from_id]: ' + contextMessage?.from?.id;
    log += '\n[is_bot]: ' + contextMessage?.from?.is_bot;
    log += '\n[from_first_name]: ' + contextMessage?.from?.first_name;
    log += '\n[from_username]: ' + contextMessage?.from?.username;
    log += '\n[chat_id]: ' + contextMessage?.chat?.id; 
    log += '\n[text]: ' + contextMessage?.text;
    log  += '\n-------------------------------------------'

    console.log(log);
}

module.exports = showLogIncomigMessage;