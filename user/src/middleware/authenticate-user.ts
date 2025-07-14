import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthenticationError from "../errors/AuthenticationError";
import config from "../config";


const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError({
        message: "Authorization token missing or malformed",
        statusCode: 401,
        code: "ERR_AUTH",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AuthenticationError({
        message: "Authorization token missing or malformed",
        statusCode: 401,
        code: "ERR_AUTH",
      });
    }
    const decoded = jwt.verify(token, config.secretKey as string) as JwtPayload & {
      id: string;
      email: string;
      image: string;
    };
    console.log("decoded",decoded);
    
    // ✅ Attach only user ID to request
    if (!decoded?.id) {
      throw new AuthenticationError({
        message: "Invalid token or malformed",
        statusCode: 401,
        code: "ERR_AUTH",
      });
    }
    req.user = {
      id: decoded.id,
      name:decoded.name,
      email: decoded.email,
      image: decoded.image
    };
    next();
  } catch (error) {
    next(error);
  }
};



export default authenticateUser;
