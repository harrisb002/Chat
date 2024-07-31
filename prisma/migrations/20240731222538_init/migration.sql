/*
  Warnings:

  - You are about to drop the column `notificationSetting` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notificationSetting",
ADD COLUMN     "notificationSettings" "NotificationSettings"[];
