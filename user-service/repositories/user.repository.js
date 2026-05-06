const db = require("../models");
const User = db.users;

class UserRepository {
    async findByUsername(username) {
        return await User.findOne({ where: { username: username } });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async create(userData) {
        return await User.create(userData);
    }
}

module.exports = new UserRepository();