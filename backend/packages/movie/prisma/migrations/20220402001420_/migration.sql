/*
  Warnings:

  - The `state` column on the `SessionSeats` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'SELECTED', 'BUSY', 'BLOCKED');

-- AlterTable
ALTER TABLE "SessionSeats" DROP COLUMN "state",
ADD COLUMN     "state" "SeatStatus" NOT NULL DEFAULT E'AVAILABLE';
