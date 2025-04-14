/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectWithDB } from "@/lib/ConnectWithDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    // console.log("DELETE called for id:", params.id);
    const id = await params.id;
  const db = await ConnectWithDB();
  const imagesCollection = await db.collection("images");

  try {
    const objectId = new ObjectId(id);
    const isExist = await imagesCollection.findOne({ _id: objectId });

    if (!isExist) {
      return NextResponse.json(
        { statusCode: 404, message: "Image Not Found" },
        { status: 404 }
      );
    }

    await imagesCollection.deleteOne({ _id: objectId });

    return NextResponse.json(
      { statusCode: 200, message: "Successfully Image Deleted", data: null },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting image:", error);

    return NextResponse.json(
      {
        statusCode: 500,
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
