import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from '@/lib/db'
import { handleApiError, validateRequiredFields } from '@/lib/errors'

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

    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      )
    }

    const userData = await verifyToken(token)

    return NextResponse.json({
      success: true,
      user: userData
    })

  } catch (error: any) {
    const { error: errorResponse, status } = handleApiError(error)
    return NextResponse.json(errorResponse, { status })
  }
}
