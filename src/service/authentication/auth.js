const config = require('../../config/app.conf');
const md5 = require('js-md5');

async function isAuth(instance, login, password){

    const user = await instance
        .select("id")
        .from("users")
        .where({username: login, password: md5(password)});
    
    return user[0]?.id ? true : false;
}

module.exports = isAuth;