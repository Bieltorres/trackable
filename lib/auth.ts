import { NextApiRequest } from "next";
import cookie from "cookie";
import { verifyToken } from "./jwt";
import prisma from "./prisma";
import { UserSafe } from "../types/auth";

export async function getUserFromReq(req: NextApiRequest): Promise<UserSafe | null> {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return null;

    const safeUser: UserSafe = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return safeUser;
  } catch (err) {
    return null;
  }
}
