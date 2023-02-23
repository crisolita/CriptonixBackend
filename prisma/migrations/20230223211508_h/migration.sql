/*
  Warnings:

  - A unique constraint covering the columns `[creationDate]` on the table `Collections` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Collections_collectionID_key";

-- CreateIndex
CREATE UNIQUE INDEX "Collections_creationDate_key" ON "Collections"("creationDate");
