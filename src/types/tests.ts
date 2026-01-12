export type QuestionOption = string | { value: string | number; label: string }

export interface TestQuestion {
  id: string
  text: string
  type: 'MULTIPLE_CHOICE' | 'LIKERT_SCALE' | 'YES_NO' | 'TEXT'
  order: number
  options: string | null
}

export interface TestSummary {
  id: string
  slug: string
  title: string
  description: string
  shortDescription?: string
  category: string
  instructions?: string
  timeLimit?: number
  cardImage?: string
  questionCount?: number
  isActive?: boolean
}

export interface TestDetail extends TestSummary {
  questions: TestQuestion[]
  isPremium?: boolean
  createdAt?: string
  updatedAt?: string
}
