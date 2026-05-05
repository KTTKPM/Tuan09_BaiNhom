// DTO dùng để lọc dữ liệu trả về, không gửi password ra ngoài
const userResponseDTO = (user) => {
    return {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email
    };
};

module.exports = { userResponseDTO };