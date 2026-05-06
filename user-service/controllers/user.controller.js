const userService = require("../services/user.service");
const { userResponseDTO } = require("../dto/user.dto");

exports.register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ status: "success", data: userResponseDTO(user) });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body.username, req.body.password);
        res.status(200).json({ status: "success", data: userResponseDTO(user) });
    } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json({ status: "success", data: userResponseDTO(user) });
    } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
    try {
        res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (err) { next(err); }
};