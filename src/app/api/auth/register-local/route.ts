import { NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Create user using local database
    const user = await createUser(email, password, name)

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error: any) {
    console.error("Registration error:", error)
    
    return NextResponse.json(
      { error: error.message || "Erro ao criar conta" },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Endpoint de listagem de usuários"
    })
  } catch (error: any) {
    console.error("Error fetching users:", error)
    
    return NextResponse.json(
      { error: error.message || "Erro ao buscar usuários" },
      { status: 500 }
    )
  }
}