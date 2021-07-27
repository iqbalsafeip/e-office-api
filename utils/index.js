const models = require('../models');

const checkUsername = (username) => {
    models.User.findOne({where: {'username': username}}).then(result=> {
        return result;
    })
}


module.exports = {
    checkUsername
}