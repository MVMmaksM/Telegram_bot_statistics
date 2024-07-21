const config = require('../../config/app.conf');
const md5 = require('js-md5');

async function isAuth(login, password){
    const instance  = global.instance;

    const user = await instance
        .select("id")
        .from("users")
        .where({username: login, password: md5(password)});

    if(user)
        return true;
    return false;
}

module.exports = isAuth;