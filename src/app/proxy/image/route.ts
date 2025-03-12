import { AxiosError } from "axios";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParam = request.nextUrl.searchParams.get("url");
    console.log(searchParam);
    
    if (!searchParam) {
      return NextResponse.json(
        { message: "Missing required query parameter" },
        { status: 400 },
      );
    }
    const response = await fetch(searchParam);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bufferArray = new Uint8Array(buffer);
    return new NextResponse(bufferArray, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "image/jpeg",
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: "An error occurred",
          error: err.message,
        },
        { status: err.response?.status ?? 500 },
      );
    }
  }
}
