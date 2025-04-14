/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectWithDB } from "@/lib/ConnectWithDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const imageUploadApiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
    const db = await ConnectWithDB();
    const imagesCollection = await db.collection("images");

    try {
        const formData = await req.formData();
        const files =  formData.getAll('images');

        if (!files.length) {
            return NextResponse.json(
                { statusCode: 400, message: "No images provided." },
                { status: 400 }
            );
        }

        const uploadedResults: any[] = [];
        const documentsToInsert: any[] = [];
        const failedUploads: any[] = [];

        for (const file of files) {
            if (!(file instanceof Blob)) {
                failedUploads.push({ error: "Invalid file format", file });
                continue;
            }

            const uploadForm = new FormData();
            uploadForm.append("image", file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imageUploadApiKey}`, {
                method: "POST",
                body: uploadForm,
            });

            const result = await response.json();

            if (response.ok) {
                uploadedResults.push(result);

                documentsToInsert.push({
                    imageId: result.data.id,
                    title: result.data.title,
                    url: result.data.url,
                    thumbUrl: result.data.thumb.url,
                    size: result.data.size,
                    uploadedAt: new Date(),
                });
            } else {
                failedUploads.push({
                    status: response.status,
                    message: result.error?.message || "Upload failed"
                });
            }
        }

        // Only insert if there are valid uploads
        if (documentsToInsert.length > 0) {
            await imagesCollection.insertMany(documentsToInsert);
        }

        return NextResponse.json({
            statusCode: 200,
            message: "Image upload process completed.",
            successfulUploads: uploadedResults,
            failedUploads
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
            { statusCode: 500, message: "Server Error", error: error.message },
            { status: 500 }
        );
    }
};
