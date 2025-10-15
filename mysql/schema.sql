-- Schema MySQL para Mental Saúde
-- Execute este SQL no seu banco de dados MySQL

CREATE DATABASE IF NOT EXISTS anticosccb_mentalsaude;
USE anticosccb_mentalsaude;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(191) PRIMARY KEY,
    email VARCHAR(191) UNIQUE NOT NULL,
    name VARCHAR(191),
    password VARCHAR(191),
    role ENUM('USER', 'ADMIN', 'PROFESSIONAL') DEFAULT 'USER',
    date_of_birth DATETIME,
    phone VARCHAR(191),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de testes
CREATE TABLE IF NOT EXISTS tests (
    id VARCHAR(191) PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('DEPRESSION', 'ANXIETY', 'BURNOUT', 'ADHD', 'OCD', 'STRESS', 'SLEEP', 'SELF_ESTEEM') NOT NULL,
    instructions TEXT NOT NULL,
    time_limit INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de questões
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(191) PRIMARY KEY,
    test_id VARCHAR(191) NOT NULL,
    text TEXT NOT NULL,
    type ENUM('MULTIPLE_CHOICE', 'LIKERT_SCALE', 'YES_NO', 'TEXT') NOT NULL,
    `order` INT NOT NULL,
    options TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- Tabela de respostas
CREATE TABLE IF NOT EXISTS answers (
    id VARCHAR(191) PRIMARY KEY,
    question_id VARCHAR(191) NOT NULL,
    test_result_id VARCHAR(191) NOT NULL,
    value TEXT NOT NULL,
    score INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (test_result_id) REFERENCES test_results(id) ON DELETE CASCADE
);

-- Tabela de resultados de testes
CREATE TABLE IF NOT EXISTS test_results (
    id VARCHAR(191) PRIMARY KEY,
    user_id VARCHAR(191) NOT NULL,
    test_id VARCHAR(191) NOT NULL,
    total_score INT NOT NULL,
    category VARCHAR(191) NOT NULL,
    interpretation TEXT NOT NULL,
    recommendations TEXT,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- Tabela de profissionais
CREATE TABLE IF NOT EXISTS professionals (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    specialty VARCHAR(191) NOT NULL,
    credentials VARCHAR(191) NOT NULL,
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(191) PRIMARY KEY,
    user_id VARCHAR(191) NOT NULL,
    professional_id VARCHAR(191) NOT NULL,
    scheduled_for DATETIME NOT NULL,
    status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
);

-- Tabela de avaliações profissionais
CREATE TABLE IF NOT EXISTS professional_reviews (
    id VARCHAR(191) PRIMARY KEY,
    test_result_id VARCHAR(191) NOT NULL,
    professional_id VARCHAR(191) NOT NULL,
    user_id VARCHAR(191) NOT NULL,
    review TEXT NOT NULL,
    recommendations TEXT,
    reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_result_id) REFERENCES test_results(id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de recursos educacionais
CREATE TABLE IF NOT EXISTS educational_resources (
    id VARCHAR(191) PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('ARTICLE', 'VIDEO', 'PODCAST', 'EXERCISE', 'TIP') NOT NULL,
    category VARCHAR(191) NOT NULL,
    url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tests_category ON tests(category);
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON questions(test_id);
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_professional_id ON appointments(professional_id);

-- Inserir dados iniciais de testes
INSERT IGNORE INTO tests (id, title, description, category, instructions, time_limit) VALUES
('test-depression-001', 'Teste de Depressão', 'Avaliação de sintomas depressivos e estado emocional', 'DEPRESSION', 'Responda cada questão com base em como você se sentiu nas últimas duas semanas.', 10),
('test-anxiety-001', 'Teste de Ansiedade', 'Medição de níveis de ansiedade e preocupação', 'ANXIETY', 'Responda cada questão com base em como você se sentiu nas últimas duas semanas.', 10),
('test-adhd-attention-001', 'Teste de ADHD - Atenção', 'Avaliação de déficit de atenção', 'ADHD', 'Marque a opção que melhor descreve sua frequência de cada sintoma.', 15),
('test-adhd-hyperactivity-001', 'Teste de ADHD - Hiperatividade', 'Avaliação de sintomas de hiperatividade', 'ADHD', 'Marque a opção que melhor descreve sua frequência de cada sintoma.', 15),
('test-stress-001', 'Teste de Estresse', 'Avaliação do nível de estresse atual', 'STRESS', 'Responda com base em como você se sentiu no último mês.', 10),
('test-compulsion-001', 'Teste de Compulsão Alimentar', 'Identificação de padrões alimentares', 'OCD', 'Responda com base em seus hábitos alimentares dos últimos 3 meses.', 15),
('test-suffering-001', 'Teste de Sofrimento Psíquico', 'Medição de sofrimento psicológico geral', 'DEPRESSION', 'Avalie sua saúde mental geral nas últimas semanas.', 12),
('test-social-phobia-001', 'Teste de Fobia Social', 'Avaliação de ansiedade em situações sociais', 'ANXIETY', 'Responda com base em como você se sente em situações sociais.', 15);