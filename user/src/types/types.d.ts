export type ErrorCode = "ERR_NF" | "ERR_VALID" | "ERR_BR" | "ERR_AUTH";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
  iat?: number;
  exp?: number;
  iss?: string;
}

export declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
