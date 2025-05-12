-- AlterTable
ALTER TABLE "contamination_reports" ADD COLUMN     "reject_reason" VARCHAR(400),
ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" VARCHAR(100);
