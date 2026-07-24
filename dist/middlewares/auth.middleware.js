import userJwtService from "../services/user-jwt.service.js";
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Token topilmadi" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Token topilmadi" });
        }
        const payload = userJwtService.verifyAccessToken(token);
        if (!payload.is_active) {
            return res.status(403).send({ message: "Foydalanuvchi bloklangan" });
        }
        req.user = payload;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token muddati tugagan" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "Token yaroqsiz" });
        }
        return res.status(401).send({ message: "Avtorizatsiyadan o'tilmadi" });
    }
};
export default authMiddleware;
