const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const AppError = require("../exceptions/AppError");

class UserService {
    async register(userData) {
        const existing = await userRepository.findByUsername(userData.username);
        if (existing) throw new AppError("User already exists", 400);

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await userRepository.create({
            ...userData,
            password: hashedPassword
        });
    }

    async login(username, password) {
        const user = await userRepository.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError("Invalid username or password", 401);
        }
        return user;
    }

    async getUser(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new AppError("User not found", 404);
        return user;
    }
}

module.exports = new UserService();