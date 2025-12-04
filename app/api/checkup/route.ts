import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { CheckupResponse } from "@/features/checkup/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

    const response = await axios.post<CheckupResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/nhis/checkup`,
      body,
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
