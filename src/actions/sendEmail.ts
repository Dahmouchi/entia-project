/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";

import sendEmail from "@/lib/sendemail";
import { uploadDocument } from "./cours";

export async function SendSynthese(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const courseId = formData.get("courseId") as string;

    if (!file || !userId || !courseId) {
      throw new Error("Missing required fields");
    }

    // 1️⃣ Upload the document
    const fileUrl = await uploadDocument(file);

    // 2️⃣ Get course + student info
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    const student = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!course || !student) throw new Error("Invalid course or student");

    // 3️⃣ Send email to the teacher

    const emailContentAnalyst = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <title>New Service Application</title>
</head>
<body style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0;">
  
    <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Nouvelle Synthèse Reçue</h2>
        <p>Bonjour,</p>
        <p>L'étudiant <strong>${student.name} ${
      student.prenom
    } </strong> a déposé une nouvelle synthèse pour le cours <strong>${
      course.title
    }</strong>.</p>
        <p>
           Le cours : ${course.title} <br/>
          🔗 <a href="${fileUrl}" target="_blank">Télécharger la synthèse</a>
        </p>
      </div>
    <!-- Footer -->
    <div style="padding: 24px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px; line-height: 1.5;">This is an automated message. Please do not reply to this email.</p>
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">© ${new Date().getFullYear()} RZ Hospitality. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `;
    await sendEmail(
      "", // Replace with your emailbelfort.center@gmail.com
      `New Service Application:`,
      emailContentAnalyst
    );
    await prisma.userActivity.create({
      data: {
        userId,
        courseId,
        type: "OTHER",
        description: "Synthèse déposée",
      },
    });
    return { success: true, fileUrl };
  } catch (error) {
    console.error("Erreur upload synthèse:", error);
    return { success: false, error: "Erreur lors du traitement." };
  }
}
