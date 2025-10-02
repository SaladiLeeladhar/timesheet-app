import { NextResponse } from "next/server";

const DUMMY_USER = {
  email: "user@ticktock.com",
  password: "password123",
  token: "dummy-auth-token-12345"
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
    return NextResponse.json({ success: true, token: DUMMY_USER.token });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
