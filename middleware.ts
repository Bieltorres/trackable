import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // se não houver token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // caso contrário, continua normalmente
  return NextResponse.next();
}

// define onde o middleware deve rodar
export const config = {
  matcher: ["/dashboard/:path*", "/area-membros/:path*"], // rotas que exigem login
};
