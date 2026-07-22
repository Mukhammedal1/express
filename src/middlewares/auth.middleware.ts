import { Request, Response, NextFunction } from "express";
import userJwtService from "../services/user-jwt.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

    (req as any).user = payload;

    next();
  } catch (error: any) {
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
