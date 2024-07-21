const config = require('../../config/app.conf');

function isAuth(password){
    if(password === config.password)
        return true;
    return false;
}

module.exports = isAuth;