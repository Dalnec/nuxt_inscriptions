-- CreateTable
CREATE TABLE "paymentmethod" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "paymentmethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documenttype" (
    "id" VARCHAR(2) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "documenttype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" VARCHAR(20),
    "doc_num" VARCHAR(15) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(1),
    "birthday" DATE,
    "phone" VARCHAR(11),
    "email" VARCHAR(100),
    "church" VARCHAR(100),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "documenttype_id" VARCHAR(1),
    "userId" INTEGER,
    "voucherId" INTEGER,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" VARCHAR(20),
    "picture" VARCHAR(50),
    "path" VARCHAR(255),
    "paymentMethodId" INTEGER,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucherspersons" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "voucherId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,
    "checkinAt" TIMESTAMP(3) NOT NULL,
    "checkin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "voucherspersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profileId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentmethod_description_key" ON "paymentmethod"("description");

-- CreateIndex
CREATE UNIQUE INDEX "documenttype_description_key" ON "documenttype"("description");

-- CreateIndex
CREATE UNIQUE INDEX "person_doc_num_key" ON "person"("doc_num");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_documenttype_id_fkey" FOREIGN KEY ("documenttype_id") REFERENCES "documenttype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentmethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucherspersons" ADD CONSTRAINT "voucherspersons_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucherspersons" ADD CONSTRAINT "voucherspersons_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
