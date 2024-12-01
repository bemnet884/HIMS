import { NextResponse } from "next/server";

export async function GET() {
const userId  = true;  
  if (!userId) {
    return new NextResponse("unauthorized", {status: 401})
  
  }

  return NextResponse.json({userId}, {status: 200})
}