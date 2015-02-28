var bcrypt = require('bcrypt');

module.exports = {
    hash_password: function(password){
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}
