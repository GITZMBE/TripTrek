import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export const POST = async (req: Request, res: Response) => {
  try {
    if (!req.body) return;
    const file = req.body || '';
    const contentType = req.headers.get("Content-Type") || "text/plain";
    const filename = `${nanoid()}.${contentType.split('/')[1]}`;
    const upload = await put(filename, file, {
      contentType,
      access: "public",
    });

    return NextResponse.json({ url: upload.url });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};
