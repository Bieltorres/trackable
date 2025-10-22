import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth";

export function signToken(payload: JWTPayload, expiresIn = "7d"): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in env");
  }

  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in env");
  }

  return jwt.verify(token, secret) as JWTPayload;
}
