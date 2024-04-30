import Prisma from "./postgres_connect";
import { hashData, generateToken } from "../utils/auth.util";
import { Author } from "@repo/types/author";

class AuthorServices {
  // Get author by id:
  static getAuthorById = async (id: number): Promise<Author | null> => {
    const author = await Prisma.author.findUnique({ where: { id } });

    return author;
  };
}

export default AuthorServices;
