import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/mysql"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const userData = verifyToken(token)

    return NextResponse.json({
      success: true,
      user: userData
    })

  } catch (error: any) {
    console.error("Token verification error:", error)
    
    return NextResponse.json(
      { error: error.message || "Token inválido" },
      { status: 401 }
    )
  }
}
