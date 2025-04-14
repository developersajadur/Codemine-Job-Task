// src/services/imageService.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

const Base_Api = "http://localhost:3000/api/";

export const uploadImages = async (images: File[]) => {
  try {
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));

    const res = await fetch(
      `${Base_Api}/upload/upload-images`,
      {
        method: "POST",
        body: formData,
      }
    );

    revalidateTag("IMAGES");

    // console.log(response);
    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

export const getAllImages = async () => {
  try {
    const res = await fetch(`${Base_Api}/images/get-all`, {
      cache: "no-store",
      next: { tags: ["IMAGES"] },
    });

    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};


export const deleteImage = async(id: string) => {
  try {
    const res = await fetch(`${Base_Api}/images/delete/${id}`, {
      method: "DELETE",
    })
    // console.log(res.status);
    revalidateTag("IMAGES");
    return await res.json();
  }catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
}
