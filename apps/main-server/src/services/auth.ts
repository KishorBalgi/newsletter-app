import Prisma from "./postgres_connect";
import AppError from "../utils/AppError";
import { hashData, compareHash, generateToken } from "../utils/auth.util";
import { Author } from "@repo/types/author";

class AuthServices {
  // Signup an author
  static signup = async (data: {
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

  // Login an author
  static login = async (
    email: string,
    password: string
  ): Promise<{ author: Author; token: string }> => {
    const author = await Prisma.author.findUnique({ where: { email } });

    if (!author) {
      throw new AppError(404, "User does not exist");
    }

    // Validate user password:
    if (!(await compareHash(author.password, password))) {
      throw new AppError(403, "Invalid email or password");
    }

    // Generate Token:
    const token = generateToken({ id: author.id });

    return { author, token };
  };
}

export default AuthServices;
