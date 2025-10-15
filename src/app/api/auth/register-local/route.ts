import { NextRequest, NextResponse } from "next/server"
import { createUser, getDatabaseInfo, getLocalUserCount, getLocalUsers } from "@/lib/local-db"

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
      user,
      database: getDatabaseInfo(),
      totalUsers: getLocalUserCount()
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
    const users = getLocalUsers()
    const dbInfo = getDatabaseInfo()
    
    return NextResponse.json({
      success: true,
      database: dbInfo,
      totalUsers: getLocalUserCount(),
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      }))
    })
  } catch (error: any) {
    console.error("Error fetching users:", error)
    
    return NextResponse.json(
      { error: error.message || "Erro ao buscar usuários" },
      { status: 500 }
    )
  }
}