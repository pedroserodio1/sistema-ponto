-- CreateTable
CREATE TABLE "Clock" (
    "id" TEXT NOT NULL,
    "clock_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Clock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clock" ADD CONSTRAINT "Clock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
