/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectWithDB } from "@/lib/ConnectWithDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await ConnectWithDB();
    const imagesCollection = db.collection("images");

    try {
        const result = await imagesCollection.find().toArray(); 

        return NextResponse.json({
            statusCode: 200,
            message: "Successfully fetched all images.",
            data: result,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching images:", error);

        return NextResponse.json(
            {
                statusCode: 500,
                message: "Server Error",
                error: error.message,
            },
            { status: 500 }
        );
    }
};
