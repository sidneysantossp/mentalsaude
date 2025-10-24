import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const type = searchParams.get('type') || 'overview'
    const format = searchParams.get('format') || 'csv'

    // Build date filter
    const dateFilter: any = {}
    if (startDate && endDate) {
      dateFilter.gte = new Date(startDate)
      dateFilter.lte = new Date(endDate)
    } else {
      // Default to last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      dateFilter.gte = thirtyDaysAgo
      dateFilter.lte = new Date()
    }

    // Get data based on report type
    let data: any[] = []
    let filename = ''

    switch (type) {
      case 'users':
        data = await db.user.findMany({
          where: {
            createdAt: dateFilter
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        filename = `usuarios-${new Date().toISOString().split('T')[0]}`
        break

      case 'tests':
        data = await db.test.findMany({
          where: {
            createdAt: dateFilter
          },
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            difficulty: true,
            timeLimit: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        filename = `testes-${new Date().toISOString().split('T')[0]}`
        break

      case 'results':
        data = await db.testResult.findMany({
          where: {
            completedAt: dateFilter
          },
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            },
            test: {
              select: {
                title: true,
                category: true
              }
            }
          },
          orderBy: {
            completedAt: 'desc'
          }
        })
        filename = `resultados-${new Date().toISOString().split('T')[0]}`
        break

      default: // overview
        // Get comprehensive overview data
        const users = await db.user.findMany({
          where: { createdAt: dateFilter },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        })

        const tests = await db.test.findMany({
          where: { createdAt: dateFilter },
          select: {
            id: true,
            title: true,
            category: true,
            isActive: true,
            createdAt: true
          }
        })

        const results = await db.testResult.findMany({
          where: { completedAt: dateFilter },
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            },
            test: {
              select: {
                title: true,
                category: true
              }
            }
          }
        })

        // Combine all data for overview
        data = [
          ...users.map(u => ({ ...u, type: 'user' })),
          ...tests.map(t => ({ ...t, type: 'test' })),
          ...results.map(r => ({ ...r, type: 'result' }))
        ]
        filename = `visao-geral-${new Date().toISOString().split('T')[0]}`
    }

    // Format data based on export format
    if (format === 'csv') {
      const csv = convertToCSV(data, type)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`
        }
      })
    } else if (format === 'excel') {
      // For Excel, we'll return CSV format (can be enhanced with a proper Excel library)
      const csv = convertToCSV(data, type)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'application/vnd.ms-excel',
          'Content-Disposition': `attachment; filename="${filename}.xls"`
        }
      })
    } else if (format === 'pdf') {
      // For PDF, we'll return a simple text format (can be enhanced with a PDF library)
      const text = convertToText(data, type)
      return new NextResponse(text, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="${filename}.txt"`
        }
      })
    }

    return NextResponse.json({ error: 'Formato não suportado' }, { status: 400 })
  } catch (error) {
    console.error('Error exporting report:', error)
    return NextResponse.json({ error: 'Erro ao exportar relatório' }, { status: 500 })
  }
}

function convertToCSV(data: any[], type: string): string {
  if (!data || data.length === 0) {
    return 'Nenhum dado encontrado'
  }

  let headers: string[] = []
  
  // Define headers based on data type
  if (type === 'users') {
    headers = ['ID', 'Nome', 'Email', 'Função', 'Data de Criação', 'Última Atualização']
  } else if (type === 'tests') {
    headers = ['ID', 'Título', 'Descrição', 'Categoria', 'Dificuldade', 'Tempo Limite', 'Ativo', 'Data de Criação']
  } else if (type === 'results') {
    headers = ['ID', 'Usuário', 'Email', 'Teste', 'Categoria', 'Pontuação', 'Iniciado', 'Concluído']
  } else {
    headers = ['ID', 'Tipo', 'Nome/Título', 'Email/Categoria', 'Dados Adicionais', 'Data de Criação']
  }

  // Convert data to CSV rows
  const rows = data.map(item => {
    if (type === 'users') {
      return [
        item.id,
        `"${item.name || ''}"`,
        `"${item.email || ''}"`,
        item.role || '',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : '',
        item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('pt-BR') : ''
      ]
    } else if (type === 'tests') {
      return [
        item.id,
        `"${item.title || ''}"`,
        `"${(item.description || '').replace(/"/g, '""')}"`,
        item.category || '',
        item.difficulty || '',
        item.timeLimit || '',
        item.isActive ? 'Sim' : 'Não',
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : ''
      ]
    } else if (type === 'results') {
      return [
        item.id,
        `"${item.user?.name || ''}"`,
        `"${item.user?.email || ''}"`,
        `"${item.test?.title || ''}"`,
        item.test?.category || '',
        item.score || 0,
        item.startedAt ? new Date(item.startedAt).toLocaleDateString('pt-BR') : '',
        item.completedAt ? new Date(item.completedAt).toLocaleDateString('pt-BR') : ''
      ]
    } else {
      // Overview
      return [
        item.id,
        item.type || '',
        `"${item.name || item.title || ''}"`,
        `"${item.email || item.category || ''}"`,
        `"${JSON.stringify(item).substring(0, 100).replace(/"/g, '""')}"`,
        item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : ''
      ]
    }
  })

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  return csvContent
}

function convertToText(data: any[], type: string): string {
  if (!data || data.length === 0) {
    return 'Nenhum dado encontrado'
  }

  let title = ''
  switch (type) {
    case 'users':
      title = 'RELATÓRIO DE USUÁRIOS'
      break
    case 'tests':
      title = 'RELATÓRIO DE TESTES'
      break
    case 'results':
      title = 'RELATÓRIO DE RESULTADOS'
      break
    default:
      title = 'RELATÓRIO GERAL'
  }

  let content = `${title}\n`
  content += `Gerado em: ${new Date().toLocaleDateString('pt-BR')}\n`
  content += `Total de registros: ${data.length}\n`
  content += '=' .repeat(80) + '\n\n'

  data.forEach((item, index) => {
    content += `Registro #${index + 1}\n`
    content += '-'.repeat(40) + '\n'
    
    if (type === 'users') {
      content += `ID: ${item.id}\n`
      content += `Nome: ${item.name || 'N/A'}\n`
      content += `Email: ${item.email || 'N/A'}\n`
      content += `Função: ${item.role || 'N/A'}\n`
      content += `Data de Criação: ${item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : 'N/A'}\n`
    } else if (type === 'tests') {
      content += `ID: ${item.id}\n`
      content += `Título: ${item.title || 'N/A'}\n`
      content += `Descrição: ${item.description || 'N/A'}\n`
      content += `Categoria: ${item.category || 'N/A'}\n`
      content += `Dificuldade: ${item.difficulty || 'N/A'}\n`
      content += `Tempo Limite: ${item.timeLimit || 'N/A'} minutos\n`
      content += `Ativo: ${item.isActive ? 'Sim' : 'Não'}\n`
    } else if (type === 'results') {
      content += `ID: ${item.id}\n`
      content += `Usuário: ${item.user?.name || 'N/A'}\n`
      content += `Email: ${item.user?.email || 'N/A'}\n`
      content += `Teste: ${item.test?.title || 'N/A'}\n`
      content += `Categoria: ${item.test?.category || 'N/A'}\n`
      content += `Pontuação: ${item.score || 0}\n`
      content += `Iniciado: ${item.startedAt ? new Date(item.startedAt).toLocaleDateString('pt-BR') : 'N/A'}\n`
      content += `Concluído: ${item.completedAt ? new Date(item.completedAt).toLocaleDateString('pt-BR') : 'N/A'}\n`
    } else {
      content += `ID: ${item.id}\n`
      content += `Tipo: ${item.type || 'N/A'}\n`
      content += `Nome: ${item.name || item.title || 'N/A'}\n`
      content += `Dados: ${JSON.stringify(item, null, 2)}\n`
    }
    
    content += '\n'
  })

  return content
}