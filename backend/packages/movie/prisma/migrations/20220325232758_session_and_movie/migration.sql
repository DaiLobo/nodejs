-- CreateEnum
CREATE TYPE "SessionRoom" AS ENUM ('COMMON', 'IMAX', 'DLUX', 'XD');

-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('GENERAL_AUDIENCE', 'PARENT_GUIDANCE_SUGGESTED', 'RESTRICTED');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classification" "Classification" DEFAULT E'GENERAL_AUDIENCE',
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "room" "SessionRoom" NOT NULL DEFAULT E'COMMON',
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
