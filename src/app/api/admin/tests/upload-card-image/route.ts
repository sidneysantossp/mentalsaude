import { NextRequest, NextResponse } from 'next/server'
import { promises as fsPromises } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 })
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de imagem não permitido' }, { status: 415 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fsPromises.mkdir(uploadsDir, { recursive: true })

  const extensionMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif'
  }

  const extension = extensionMap[file.type] || path.extname(file.name) || '.img'
  const fileName = `${randomUUID()}${extension}`
  const filePath = path.join(uploadsDir, fileName)
  const buffer = Buffer.from(await file.arrayBuffer())

  await fsPromises.writeFile(filePath, buffer, { mode: 0o644 })

  return NextResponse.json({ url: `/uploads/${fileName}` })
}

export async function GET() {
  return NextResponse.json({ error: 'Método não suportado' }, { status: 405 })
}
