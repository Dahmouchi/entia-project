"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { hash } from "bcrypt";


export async function RegisterClient(nom:string,prenom:string,email:string,phone:string,password:string) {
  try {
      const hashedPassword = await hash(password, 10);

    const blog = await prisma.user.create({
      data: {
        name:nom,
        username:email,
        prenom: prenom || null,
        email: email || "",
        password : hashedPassword,
        phone: parseInt(phone),
      },
    })

    revalidatePath("/")
    return { success: true, data: blog }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: "Failed to create category" }
  }
}



export async function getClientById(id: string) {
  try {
    const client = await prisma.user.findUnique({
      where: { id },
    })
    return client
  } catch (error) {
    console.error("Error fetching client:", error)
    return null
  }
}
export async function updateClientProfile1(id: string, formData: {
  personal: {
    nom: string;
    prenom: string;
    phone: string;
    age: string;
  };
  study: {
    niveau: string;
    codeInscription: string;
  };
}) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: formData.personal.nom,
        prenom: formData.personal.prenom,
        phone: parseInt(formData.personal.phone), // assuming phone is number in schema       
        age:parseInt(formData.personal.age),
        step: 1, // Set step = 1 to mark profile as completed
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating client profile:", error);
    return null;
  }
}
export async function updateClientProfile2(id: string, formData: {
  personal: {
    nom: string;
    prenom: string;
    phone: string;
    age: string;
  };
  study: {
    niveau: string;
    codeInscription: string;
  };
}) {
  try {
    const code = await prisma.registerCode.findUnique({
      where: { code: formData.study.codeInscription },
    });

    if (!code) {
      throw new Error("Le code d'inscription est invalide.");
    }

    if (code.isUsed) {
      throw new Error("Ce code a déjà été utilisé.");
    }

    // Update the RegisterCode to mark it used and link it to the user
    await prisma.registerCode.update({
      where: { code: formData.study.codeInscription },
      data: {
        isUsed: true,
        usedAt: new Date(),
        user: {
          connect: { id },
        },
      },
    });

    // Update the user with the new info
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        step: 2,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating client profile:", error);
    throw error; // Optional: let the caller catch it and handle UI errors
  }
}
