-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_newsLetterId_fkey";

-- DropForeignKey
ALTER TABLE "NewsLetter" DROP CONSTRAINT "NewsLetter_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_newsLetterId_fkey";

-- AddForeignKey
ALTER TABLE "NewsLetter" ADD CONSTRAINT "NewsLetter_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_newsLetterId_fkey" FOREIGN KEY ("newsLetterId") REFERENCES "NewsLetter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_newsLetterId_fkey" FOREIGN KEY ("newsLetterId") REFERENCES "NewsLetter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
