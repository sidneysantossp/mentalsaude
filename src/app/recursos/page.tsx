'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Play, 
  BookOpen, 
  Headphones, 
  FileText, 
  Video,
  Heart,
  Brain,
  Shield,
  Star,
  Clock,
  Users,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  Zap,
  Crown
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

const resources = [
  {
    id: 1,
    title: "Guia de Respiração para Ansiedade",
    description: "Técnicas respiratórias eficazes para acalmar a mente e reduzir sintomas de ansiedade imediatamente.",
    type: "PDF",
    category: "Ansiedade",
    duration: "15 min",
    downloadCount: "12.5k",
    rating: 4.8,
    difficulty: "Iniciante",
    icon: FileText,
    color: "bg-blue-500",
    featured: true,
    tags: ["respiração", "ansiedade", "técnica", "imediato"]
  },
  {
    id: 2,
    title: "Meditação Guiada: 10 Minutos",
    description: "Meditação guiada para iniciantes focada em mindfulness e redução de estresse.",
    type: "Áudio",
    category: "Mindfulness",
    duration: "10 min",
    downloadCount: "8.3k",
    rating: 4.9,
    difficulty: "Iniciante",
    icon: Headphones,
    color: "bg-green-500",
    featured: true,
    tags: ["meditação", "mindfulness", "guia", "iniciante"]
  },
  {
    id: 3,
    title: "Diário de Gratidão Digital",
    description: "Template de diário digital para praticar gratidão diária e melhorar o bem-estar emocional.",
    type: "Planilha",
    category: "Autoestima",
    duration: "5 min/dia",
    downloadCount: "6.7k",
    rating: 4.7,
    difficulty: "Iniciante",
    icon: BookOpen,
    color: "bg-yellow-500",
    featured: false,
    tags: ["gratidão", "diário", "bem-estar", "template"]
  },
  {
    id: 4,
    title: "Exercícios de Alongamento para Estresse",
    description: "Vídeo com alongamentos simples para aliviar tensões físicas causadas pelo estresse.",
    type: "Vídeo",
    category: "Estresse",
    duration: "12 min",
    downloadCount: "9.1k",
    rating: 4.6,
    difficulty: "Iniciante",
    icon: Video,
    color: "bg-red-500",
    featured: false,
    tags: ["alongamento", "estresse", "físico", "tensão"]
  },
  {
    id: 5,
    title: "Planilha de Controle de Humor",
    description: "Ferramenta para monitorar padrões de humor e identificar gatilhos emocionais.",
    type: "Planilha",
    category: "Autoconhecimento",
    duration: "3 min/dia",
    downloadCount: "4.2k",
    rating: 4.5,
    difficulty: "Intermediário",
    icon: FileText,
    color: "bg-purple-500",
    featured: false,
    tags: ["humor", "monitoramento", "gatilhos", "autoconhecimento"]
  },
  {
    id: 6,
    title: "Técnicas de Relaxamento Rápido",
    description: "Métodos rápidos para relaxar em situações de crise ou alta tensão.",
    type: "PDF",
    category: "Ansiedade",
    duration: "5 min",
    downloadCount: "15.8k",
    rating: 4.9,
    difficulty: "Iniciante",
    icon: Shield,
    color: "bg-blue-500",
    featured: true,
    tags: ["relaxamento", "crise", "rápido", "técnica"]
  },
  {
    id: 7,
    title: "Cardápio para Saúde Mental",
    description: "Guia alimentar com alimentos que ajudam a melhorar o humor e a função cognitiva.",
    type: "PDF",
    category: "Nutrição",
    duration: "Leitura 20 min",
    downloadCount: "7.4k",
    rating: 4.4,
    difficulty: "Iniciante",
    icon: Heart,
    color: "bg-pink-500",
    featured: false,
    tags: ["alimentação", "humor", "nutrição", "cérebro"]
  },
  {
    id: 8,
    title: "Exercícios de Autoafirmação",
    description: "Áudio com afirmações positivas para fortalecer a autoestima e confiança.",
    type: "Áudio",
    category: "Autoestima",
    duration: "8 min",
    downloadCount: "5.9k",
    rating: 4.7,
    difficulty: "Iniciante",
    icon: Headphones,
    color: "bg-yellow-500",
    featured: false,
    tags: ["autoafirmação", "autoestima", "positivo", "confiança"]
  },
  {
    id: 9,
    title: "Guia de Sono de Qualidade",
    description: "Estratégias comprovadas para melhorar a qualidade do sono e o bem-estar mental.",
    type: "PDF",
    category: "Sono",
    duration: "Leitura 15 min",
    downloadCount: "11.2k",
    rating: 4.8,
    difficulty: "Iniciante",
    icon: Brain,
    color: "bg-indigo-500",
    featured: true,
    tags: ["sono", "qualidade", "descanso", "estratégias"]
  }
]

const categories = ["Todos", "Ansiedade", "Mindfulness", "Autoestima", "Estresse", "Autoconhecimento", "Nutrição", "Sono"]
const types = ["Todos", "PDF", "Áudio", "Vídeo", "Planilha"]
const difficulties = ["Todos", "Iniciante", "Intermediário", "Avançado"]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedType, setSelectedType] = useState("Todos")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos")

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Todos" || resource.category === selectedCategory
    const matchesType = selectedType === "Todos" || resource.type === selectedType
    const matchesDifficulty = selectedDifficulty === "Todos" || resource.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty
  })

  const featuredResources = resources.filter(resource => resource.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF": return FileText
      case "Áudio": return Headphones
      case "Vídeo": return Video
      case "Planilha": return BookOpen
      default: return FileText
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800"
      case "Intermediário": return "bg-yellow-100 text-yellow-800"
      case "Avançado": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Recursos Gratuitos
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Ferramentas para seu
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">Bem-Estar</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Acesse gratuitamente materiais educativos, exercícios e guias práticos 
                para cuidar da sua saúde mental no dia a dia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Download className="h-5 w-5 mr-2" />
                  Baixar Materiais
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                  <Link href="/chat" className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Comunidade de Apoio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Recursos Gratuitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100k+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Disponibilidade</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar recursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {filteredResources.length} recurso{filteredResources.length !== 1 ? 's' : ''} encontrado{filteredResources.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        {searchTerm === "" && selectedCategory === "Todos" && selectedType === "Todos" && selectedDifficulty === "Todos" && (
          <section className="container mx-auto px-4 pb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Recursos em Destaque
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center`}>
                          <resource.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {resource.duration}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {resource.downloadCount}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {resource.rating}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(resource.difficulty)}>
                            {resource.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          <Download className="h-3 w-3 mr-1" />
                          Baixar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Resources */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Todos os Recursos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white hover:border-blue-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 ${resource.color} rounded-lg flex items-center justify-center`}>
                        <resource.icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.duration}
                        </span>
                        <span className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {resource.downloadCount}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {resource.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                      
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-3 w-3 mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum recurso encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todos")
                  setSelectedType("Todos")
                  setSelectedDifficulty("Todos")
                }}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Precisa de Suporte Adicional?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se à nossa comunidade premium e tenha acesso a salas de chat exclusivas, 
              conteúdo especializado e suporte profissional 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/plans" className="flex items-center">
                  <Crown className="h-5 w-5 mr-2" />
                  Conhecer Planos Premium
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/chat">Experimentar Chat Gratuito</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}