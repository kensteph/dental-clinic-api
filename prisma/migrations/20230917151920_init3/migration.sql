/*
  Warnings:

  - You are about to drop the `Treatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evolution" DROP CONSTRAINT "Evolution_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_dentist_id_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_patient_id_fkey";

-- DropTable
DROP TABLE "Treatment";

-- CreateTable
CREATE TABLE "TreatmentAvailable" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "procedure_description" TEXT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentAvailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentPatient" (
    "id" TEXT NOT NULL,
    "treatment_date" TIMESTAMP(3) NOT NULL,
    "status" "TreatmentStatus" NOT NULL DEFAULT 'Scheduled',
    "discount" DECIMAL(65,30) NOT NULL,
    "final_cost" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patient_id" TEXT NOT NULL,
    "treatment_av_id" BIGINT NOT NULL,
    "dentist_id" TEXT NOT NULL,

    CONSTRAINT "TreatmentPatient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentAvailable_name_key" ON "TreatmentAvailable"("name");

-- AddForeignKey
ALTER TABLE "TreatmentPatient" ADD CONSTRAINT "TreatmentPatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentPatient" ADD CONSTRAINT "TreatmentPatient_treatment_av_id_fkey" FOREIGN KEY ("treatment_av_id") REFERENCES "TreatmentAvailable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentPatient" ADD CONSTRAINT "TreatmentPatient_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evolution" ADD CONSTRAINT "Evolution_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "TreatmentPatient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "TreatmentPatient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
