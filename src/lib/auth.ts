import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "pp-admin-2025-parentapedia-secret-key"
);

export const COOKIE_NAME = "pp_admin";
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin";

export function checkCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createToken(): Promise<string> {
  return new SignJWT({ u: ADMIN_USERNAME })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}
