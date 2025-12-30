-- Criação das tabelas para o Mental Saúde
-- Execute este SQL no painel do Supabase SQL Editor

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos enumerados
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN', 'PROFESSIONAL');
CREATE TYPE test_category AS ENUM ('DEPRESSION', 'ANXIETY', 'BURNOUT', 'ADHD', 'OCD', 'STRESS', 'SLEEP', 'SELF_ESTEEM');
CREATE TYPE question_type AS ENUM ('MULTIPLE_CHOICE', 'LIKERT_SCALE', 'YES_NO', 'TEXT');
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE resource_type AS ENUM ('ARTICLE', 'VIDEO', 'PODCAST', 'EXERCISE', 'TIP');

-- Tabela de usuários (integrada com auth.users do Supabase)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  role user_role DEFAULT 'USER',
  password_hash TEXT, -- Para autenticação local com JWT
  date_of_birth TIMESTAMP,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de testes
CREATE TABLE public.tests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE, -- URL canônica baseada no título
  description TEXT NOT NULL,
  short_description TEXT, -- mini descrição para o card
  category test_category NOT NULL,
  instructions TEXT NOT NULL,
  time_limit INTEGER, -- em minutos
  is_premium BOOLEAN DEFAULT false, -- gratuito ou premium
  card_image TEXT, -- URL da imagem destacada do card
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de questões
CREATE TABLE public.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type question_type NOT NULL,
  "order" INTEGER NOT NULL,
  options TEXT, -- JSON array para opções de múltipla escolha
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de respostas
CREATE TABLE public.answers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  test_result_id UUID REFERENCES public.test_results(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de resultados de testes
CREATE TABLE public.test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL,
  category TEXT NOT NULL, -- categoria do resultado (ex: "leve", "moderado", "grave")
  interpretation TEXT NOT NULL,
  recommendations TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de profissionais
CREATE TABLE public.professionals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  specialty TEXT NOT NULL,
  credentials TEXT NOT NULL,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status appointment_status DEFAULT 'SCHEDULED',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações profissionais
CREATE TABLE public.professional_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  test_result_id UUID REFERENCES public.test_results(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  review TEXT NOT NULL,
  recommendations TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de recursos educacionais
CREATE TABLE public.educational_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type resource_type NOT NULL,
  category TEXT NOT NULL,
  url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_tests_category ON public.tests(category);
CREATE INDEX idx_questions_test_id ON public.questions(test_id);
CREATE INDEX idx_test_results_user_id ON public.test_results(user_id);
CREATE INDEX idx_test_results_test_id ON public.test_results(test_id);
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_professional_id ON public.appointments(professional_id);

-- RLS (Row Level Security) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_reviews ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies para test_results
CREATE POLICY "Users can view own test results" ON public.test_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results" ON public.test_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para appointments
CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para professional_reviews
CREATE POLICY "Users can view own professional reviews" ON public.professional_reviews
  FOR SELECT USING (auth.uid() = user_id);

-- Functions para timestamps atualizados automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para timestamps
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_tests_updated_at
  BEFORE UPDATE ON public.tests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_professionals_updated_at
  BEFORE UPDATE ON public.professionals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_educational_resources_updated_at
  BEFORE UPDATE ON public.educational_resources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function para criar perfil automaticamente após registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados iniciais de testes
INSERT INTO public.tests (title, slug, description, short_description, category, instructions, time_limit) VALUES
('PHQ-9 - Teste de Depressão', 'phq-9', 'Escala de avaliação de sintomas depressivos baseada nos nove critérios do DSM-5. Foi validada em diferentes populações e é amplamente usada para triagem.', 'Triagem confiável para sintomas de depressão em adultos.', 'DEPRESSION', 'Responda cada questão com base em como você se sentiu nas últimas duas semanas.', 10),
('GAD-7 - Teste de Ansiedade', 'gad-7', 'Instrumento de sete questões que rastreia sintomas de ansiedade generalizada em adultos. É rápido, validado e útil para monitoramento.', 'Triagem segura para ansiedade generalizada.', 'ANXIETY', 'Responda cada questão com base em como você se sentiu nas últimas duas semanas.', 10),
('Teste de ADHD - Atenção', 'teste-adhd-atencao', 'Avaliação de déficit de atenção', 'Avaliação completa para sintomas de déficit de atenção.', 'ADHD', 'Marque a opção que melhor descreve sua frequência de cada sintoma.', 15),
('Teste de ADHD - Hiperatividade', 'teste-adhd-hiperatividade', 'Avaliação de sintomas de hiperatividade', 'Avaliação completa para sintomas de hiperatividade.', 'ADHD', 'Marque a opção que melhor descreve sua frequência de cada sintoma.', 15),
('Teste de Estresse', 'teste-estresse', 'Avaliação do nível de estresse atual', 'Medição precisa do nível de estresse atual.', 'STRESS', 'Responda com base em como você se sentiu no último mês.', 10),
('Teste de Compulsão Alimentar', 'teste-compulsao-alimentar', 'Identificação de padrões alimentares', 'Avaliação de padrões alimentares compulsivos.', 'OCD', 'Responda com base em seus hábitos alimentares dos últimos 3 meses.', 15),
('Teste de Sofrimento Psíquico', 'teste-sofrimento-psiquico', 'Medição de sofrimento psicológico geral', 'Avaliação geral do sofrimento psicológico.', 'DEPRESSION', 'Avalie sua saúde mental geral nas últimas semanas.', 12),
('SPIN - Teste de Fobia Social', 'teste-fobia-social', 'Instrumento de 17 itens que avalia medo e evitamento de situações sociais. Útil para identificar transtorno de ansiedade social e monitorar tratamento.', 'Avaliação completa para ansiedade em situações sociais.', 'ANXIETY', 'Responda com base em como você se sente em situações sociais.', 15);
