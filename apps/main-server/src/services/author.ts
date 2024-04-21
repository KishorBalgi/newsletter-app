import Prisma from "./postgres_connect";
import { hashData, generateToken } from "../utils/auth.util";
import { Author } from "@repo/types/author";

class AuthorServices {
  // Create a new author
  static createAuthor = async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ author: Author; token: string }> => {
    // Hash the password:
    const hashedPassword = await hashData(data.password);
    // Save the author to the database:
    data.password = hashedPassword;

    const author = await Prisma.author.create({ data });

    // Generate Token:
    const token = generateToken({ id: author.id });
    return { author, token };
  };
}

export default AuthorServices;
