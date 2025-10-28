"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import sharp from "sharp";
import { getFileUrl, uploadFile } from "@/lib/cloudeFlare";


export async function createBlog(formData: FormData) {
  try {
    const name = formData.get("title") as string
 
    const blog = await prisma.registerCode.create({
      data: {
        code:name,
      },
    })

    revalidatePath("/") 
    return { success: true, data: blog }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: "Failed to create category" }
  }
}


export async function updateBlog(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;

    const updatedBlog = await prisma.registerCode.update({
      where: { id },
      data: {
        code:title,
      },
    });

    revalidatePath("/") ;
    return { success: true, data: updatedBlog };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  try {
    await prisma.registerCode.delete({
      where: { id },
    })

    revalidatePath("/") 
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: "Failed to delete category" }
  }
}

export async function getBlogs() {
  try {
    const blogs = await prisma.registerCode.findMany({
      orderBy: { createdAt: "asc" },
      include:{
        user:true,
      }
    })
    return blogs
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
