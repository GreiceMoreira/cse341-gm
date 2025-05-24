const { hashPassword } = require("./hashPassword");


async function prepareUserData({ email, password, name, age, avatar}) {
    const userData = {email, name, age,avatar};

    if (password) {
        userData.password = await hashPassword(password);
    }

    return userData;

}

module.exports = {prepareUserData};