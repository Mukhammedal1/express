import jwt from "jsonwebtoken";
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "15d",
    });
    return { accessToken, refreshToken };
};
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
};
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
};
export default {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken,
};
