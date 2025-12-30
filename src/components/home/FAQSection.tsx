'use client'

import { useState } from 'react'
import { Brain, ChevronDown, ChevronUp } from 'lucide-react'

export type FAQItem = {
  id: number
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {items.map((item) => {
          const isOpen = openItems.includes(item.id)
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="h-6 w-6 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <div className="pl-16 border-l-4 border-blue-200 pl-8">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
