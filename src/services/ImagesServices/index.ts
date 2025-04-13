// src/services/imageService.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export const uploadImages = async (images: File[]) => {
  try {
    const formData = new FormData();
    images.forEach(file => formData.append('images', file));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/upload/upload-images`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
        revalidateTag('IMAGES')
      return { success: true, result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};



export const getAllImages = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/images/get-all`, {
      cache: "no-store",
      next: { tags: ["IMAGES"] },
    });

    return await response.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
