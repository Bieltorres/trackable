import type { NextApiRequest } from "next";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
}
