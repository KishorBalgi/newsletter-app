import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashData = async (data: string) => {
  return await bcrypt.hash(data, 12);
};

export const compareHash = async (
  encryptedData: string,
  originalData: string
) => {
  return await bcrypt.compare(originalData, encryptedData);
};

// Generate Token:
export const generateToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Verify Token:
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
