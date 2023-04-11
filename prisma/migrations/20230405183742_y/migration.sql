-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "direccion" TEXT;

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "coste_unitario" INTEGER NOT NULL,
    "descripcion" TEXT,
    "fullname" TEXT NOT NULL,
    "direccion" TEXT,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
