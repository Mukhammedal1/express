import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
  is_active: boolean;
}

const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY as string, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY as string, {
    expiresIn: "15d",
  });

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string) as TokenPayload;
};

const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string) as TokenPayload;
};

export default {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};