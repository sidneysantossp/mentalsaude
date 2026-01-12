import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { DEFAULT_TEST_SUMMARIES } from '@/lib/test-fallback'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await db
      .from('tests')
      .select('id, slug, title, description, short_description, category, instructions, time_limit, card_image, is_active, questions(id)')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    const tests = (data ?? []).map((test) => ({
      id: test.id,
      slug: test.slug,
      title: test.title,
      description: test.description,
      shortDescription: test.short_description ?? undefined,
      category: test.category,
      instructions: test.instructions ?? undefined,
      timeLimit: test.time_limit ?? undefined,
      cardImage: test.card_image ?? undefined,
      questionCount: Array.isArray(test.questions) ? test.questions.length : undefined,
      isActive: test.is_active ?? false
    }))

    return NextResponse.json(tests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(DEFAULT_TEST_SUMMARIES)
  }
}
