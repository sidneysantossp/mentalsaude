import { db } from '@/lib/db'
import { ResultsClient } from './ResultsClient'

async function getTestResults() {
  try {
    const results = await db.testResult.findMany({
      include: {
        test: true,
        answers: {
          include: {
            question: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    return results.map(result => ({
      id: result.id,
      totalScore: result.totalScore,
      category: result.category,
      interpretation: result.interpretation,
      recommendations: result.recommendations,
      completedAt: result.completedAt,
      test: {
        id: result.test.id,
        title: result.test.title,
        category: result.test.category
      }
    }))
  } catch (error) {
    console.error('Error fetching test results:', error)
    return []
  }
}

export default async function ResultsPage() {
  const testResults = await getTestResults()

  return <ResultsClient initialResults={testResults} />
}