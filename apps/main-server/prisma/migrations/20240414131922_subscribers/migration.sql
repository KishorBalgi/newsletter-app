-- CreateTable
CREATE TABLE "Subscriber" (
    "newsLetterId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("newsLetterId","email")
);

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_newsLetterId_fkey" FOREIGN KEY ("newsLetterId") REFERENCES "NewsLetter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
