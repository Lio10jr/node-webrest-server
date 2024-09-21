-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "completedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
