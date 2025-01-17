const { compareSync, genSaltSync, hashSync } = require("bcryptjs");

const bcryptAdapter = {

    hash: (password) => {
        const salt = genSaltSync();
        return hashSync(password, salt)
    },
    compare: (password, hashed) => {
        return compareSync(password, hashed);
    }
}

module.exports = { bcryptAdapter }