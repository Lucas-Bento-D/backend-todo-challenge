/*
  Warnings:

  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
