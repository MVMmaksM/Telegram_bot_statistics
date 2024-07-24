const config = require('../../config/app.conf');
const md5 = require('js-md5');

async function isAuth(instance, credentials){
    const credentialsSplit = credentials.split(" ");

    if(credentialsSplit.length != 2)
        return false;

    const user = await instance
        .select("id")
        .from("users")
        .where({username: credentialsSplit[0], password: md5(credentialsSplit[1])});
    
    return user[0]?.id ? true : false;
}

module.exports = isAuth;