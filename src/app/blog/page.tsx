'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Search, Filter, Brain, Heart, Flame, Users, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "5 Técnicas de Meditação para Reduzir a Ansiedade",
    excerpt: "Aprenda práticas simples de meditação que podem ajudar a acalmar sua mente e reduzir os sintomas de ansiedade no dia a dia.",
    category: "Mindfulness",
    categoryColor: "bg-yellow-500",
    author: "Dra. Ana Silva",
    authorRole: "Psicóloga Clínica",
    date: "15 de Novembro, 2024",
    readTime: "5 min de leitura",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["meditação", "ansiedade", "bem-estar"]
  },
  {
    id: 2,
    title: "Como Identificar os Sinais de Burnout",
    excerpt: "Entenda os principais sintomas do esgotamento profissional e descubra estratégias eficazes para recuperar seu equilíbrio.",
    category: "Bem-Estar",
    categoryColor: "bg-blue-500",
    author: "Dr. Carlos Mendes",
    authorRole: "Psiquiatra",
    date: "12 de Novembro, 2024",
    readTime: "8 min de leitura",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["burnout", "trabalho", "estresse"]
  },
  {
    id: 3,
    title: "O Poder da Autoestima na Saúde Mental",
    excerpt: "Descubra como fortalecer sua autoestima pode transformar sua saúde mental e melhorar sua qualidade de vida.",
    category: "Autoestima",
    categoryColor: "bg-green-500",
    author: "Dra. Maria Santos",
    authorRole: "Terapeuta Ocupacional",
    date: "10 de Novembro, 2024",
    readTime: "6 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["autoestima", "desenvolvimento pessoal", "saúde mental"]
  },
  {
    id: 4,
    title: "Depressão: Sinais, Sintomas e Quando Procurar Ajuda",
    excerpt: "Aprenda a reconhecer os sinais da depressão e entenda quando é o momento certo de buscar apoio profissional.",
    category: "Depressão",
    categoryColor: "bg-purple-500",
    author: "Dr. Pedro Costa",
    authorRole: "Psicólogo",
    date: "8 de Novembro, 2024",
    readTime: "10 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["depressão", "saúde mental", "ajuda profissional"]
  },
  {
    id: 5,
    title: "Alimentação e Saúde Mental: A Conexão que Você Precisa Conhecer",
    excerpt: "Descubra como sua alimentação pode impactar diretamente seu humor, ansiedade e bem-estar emocional.",
    category: "Nutrição",
    categoryColor: "bg-orange-500",
    author: "Dra. Lucia Ferreira",
    authorRole: "Nutricionista",
    date: "5 de Novembro, 2024",
    readTime: "7 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["nutrição", "alimentação", "bem-estar"]
  },
  {
    id: 6,
    title: "TDAH em Adultos: Como Identificar e Conviver",
    excerpt: "Entenda os sintomas do TDAH na vida adulta e aprenda estratégias práticas para lidar com o transtorno.",
    category: "TDAH",
    categoryColor: "bg-red-500",
    author: "Dr. Roberto Almeida",
    authorRole: "Psiquiatra",
    date: "3 de Novembro, 2024",
    readTime: "12 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["TDAH", "adultos", "transtornos"]
  },
  {
    id: 7,
    title: "Sono e Saúde Mental: A Importância de uma Boa Noite de Descanso",
    excerpt: "Descubra como a qualidade do seu sono afeta diretamente sua saúde mental e aprenda a melhorar suas noites.",
    category: "Sono",
    categoryColor: "bg-indigo-500",
    author: "Dra. Paula Ribeiro",
    authorRole: "Médica do Sono",
    date: "1 de Novembro, 2024",
    readTime: "9 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["sono", "descanso", "saúde mental"]
  },
  {
    id: 8,
    title: "Relacionamentos Saudáveis: Como Construir Vínculos Fortes",
    excerpt: "Aprenda a desenvolver relacionamentos saudáveis que contribuam para seu bem-estar emocional e crescimento pessoal.",
    category: "Relacionamentos",
    categoryColor: "bg-pink-500",
    author: "Dra. Fernanda Lima",
    authorRole: "Terapeuta de Casal",
    date: "28 de Outubro, 2024",
    readTime: "11 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["relacionamentos", "comunicação", "emocional"]
  },
  {
    id: 9,
    title: "Mindfulness no Trabalho: Reduzindo o Estresse Corporativo",
    excerpt: "Descubra como aplicar técnicas de mindfulness no ambiente de trabalho para reduzir o estresse e aumentar a produtividade.",
    category: "Mindfulness",
    categoryColor: "bg-yellow-500",
    author: "Dr. Marcos Oliveira",
    authorRole: "Consultor de Bem-Estar",
    date: "25 de Outubro, 2024",
    readTime: "8 min de leitura",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["mindfulness", "trabalho", "estresse"]
  }
]

// Categories for filtering
const categories = ["Todos", "Mindfulness", "Bem-Estar", "Autoestima", "Depressão", "Nutrição", "TDAH", "Sono", "Relacionamentos"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <LayoutWrapper>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
              alt="Blog Saúde Mental"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Blog
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent block">Saúde Mental</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Artigos, dicas e informações para cuidar da sua saúde mental e bem-estar emocional
            </p>
          </div>
        </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && currentPage === 1 && !searchTerm && selectedCategory === "Todos" && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigo em Destaque</h2>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-yellow-500">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`${featuredPost.categoryColor} text-white`}>
                        {featuredPost.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{featuredPost.date}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white">
                      Ler Artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-yellow-500 hover:-translate-y-1">
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${post.categoryColor} text-white`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="font-bold text-gray-900 text-xl mb-4 leading-tight">
                    {post.title}
                  </h2>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-600 font-semibold text-sm hover:text-yellow-700 cursor-pointer">
                      Ler mais →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page 
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Receba Nossos Artigos por E-mail
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Cadastre-se para receber as últimas dicas e informações sobre saúde mental diretamente na sua caixa de entrada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </LayoutWrapper>
  )
}