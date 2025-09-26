import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, birthdate, userInfo } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar token de autenticação
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token de autenticação não encontrado" },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Preparar dados para atualização do usuário
    const userData: any = { name: name.trim() };
    
    if (phone !== undefined) {
      userData.phone = phone;
    }
    
    if (birthdate !== undefined) {
      userData.birthdate = birthdate ? new Date(birthdate) : null;
    }

    // Atualizar informações do usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        birthdate: true,
      },
    });

    // Atualizar ou criar UserInfo se fornecido
    let updatedUserInfo = null;
    if (userInfo) {
      const userInfoData = {
        bio: userInfo.bio || null,
        cep: userInfo.cep || null,
        rua: userInfo.rua || null,
        cidade: userInfo.cidade || null,
        estado: userInfo.estado || null,
        pais: userInfo.pais || "Brasil",
      };

      updatedUserInfo = await prisma.userInfo.upsert({
        where: { userId },
        update: userInfoData,
        create: {
          userId,
          ...userInfoData,
        },
      });
    }

    return NextResponse.json({ 
      message: "Informações atualizadas com sucesso",
      user: updatedUser,
      userInfo: updatedUserInfo
    });
  } catch (error) {
    console.error("Erro em update-profile:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
