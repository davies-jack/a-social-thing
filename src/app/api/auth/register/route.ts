import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, username, password, confirmPassword } = body;

  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json({ message: "Missing required fields", error: true }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return NextResponse.json(
      { message: "Username can only contain letters and numbers", error: true },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ message: "Passwords do not match", error: true }, { status: 400 });
  }

  try {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      return NextResponse.json({ message: "Email already exists", error: true }, { status: 400 });
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExists) {
      return NextResponse.json(
        { message: "Username already exists", error: true },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });
    const exposedUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return NextResponse.json(
      { message: `You have successfully registered.`, user: exposedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", error: true }, { status: 500 });
  }
}
