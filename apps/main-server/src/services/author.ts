import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Author } from "@repo/types/author";

const prisma = new PrismaClient();

// Create a new author
export const createAuthor = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<Author> => {
  try {
    // Hash the password:
    const hashedPassword = await bcrypt.hash(data.password, 12);
    // Save the author to the database:
    data.password = hashedPassword;
    return prisma.author.create({ data });
  } catch (err: any) {
    throw new Error(err);
  }
};
