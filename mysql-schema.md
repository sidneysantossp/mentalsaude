# Schema MySQL - Plataforma de Saúde Mental

## Overview
Este documento contém a estrutura completa do banco de dados MySQL para a plataforma de testes psicológicos e saúde mental.

## Estrutura do Banco de Dados

### 1. Tabela: users
Armazena informações dos usuários da plataforma.

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do usuário
- `email`: Email do usuário (único)
- `name`: Nome do usuário
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 2. Tabela: tests
Armazena os testes psicológicos disponíveis.

```sql
CREATE TABLE `tests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(100) NOT NULL,
  `duration_minutes` int NOT NULL,
  `question_count` int NOT NULL,
  `difficulty_level` varchar(20) NOT NULL,
  `is_free` boolean NOT NULL DEFAULT true,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do teste
- `title`: Título do teste
- `description`: Descrição detalhada
- `category`: Categoria (depressão, ansiedade, etc.)
- `duration_minutes`: Duração estimada em minutos
- `question_count`: Número de questões
- `difficulty_level`: Nível de dificuldade (Fácil, Médio, Difícil)
- `is_free`: Se o teste é gratuito
- `image_url`: URL da imagem ilustrativa
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 3. Tabela: questions
Armazena as perguntas dos testes.

```sql
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_id` int NOT NULL,
  `question_text` text NOT NULL,
  `question_type` varchar(50) NOT NULL DEFAULT 'multiple_choice',
  `order_index` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_test_id_fkey` (`test_id`),
  CONSTRAINT `questions_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único da questão
- `test_id`: ID do teste associado
- `question_text`: Texto da pergunta
- `question_type`: Tipo da pergunta (múltipla escolha, escala, etc.)
- `order_index`: Ordem da questão no teste
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 4. Tabela: answers
Armazena as opções de resposta para cada pergunta.

```sql
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `answer_text` varchar(255) NOT NULL,
  `score_value` int NOT NULL DEFAULT 0,
  `order_index` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answers_question_id_fkey` (`question_id`),
  CONSTRAINT `answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único da resposta
- `question_id`: ID da pergunta associada
- `answer_text`: Texto da resposta
- `score_value`: Valor pontuado da resposta
- `order_index`: Ordem da resposta
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 5. Tabela: test_results
Armazena os resultados dos testes realizados pelos usuários.

```sql
CREATE TABLE `test_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `test_id` int NOT NULL,
  `score` int NOT NULL,
  `max_score` int NOT NULL,
  `result_level` varchar(50) NOT NULL,
  `recommendations` text,
  `completed_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test_results_user_id_fkey` (`user_id`),
  KEY `test_results_test_id_fkey` (`test_id`),
  CONSTRAINT `test_results_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE,
  CONSTRAINT `test_results_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do resultado
- `user_id`: ID do usuário que realizou o teste
- `test_id`: ID do teste realizado
- `score`: Pontuação obtida
- `max_score`: Pontuação máxima possível
- `result_level`: Nível do resultado (Leve, Moderado, Severo)
- `recommendations`: Recomendações baseadas no resultado
- `completed_at`: Data de conclusão do teste
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 6. Tabela: professionals
Armazena informações dos profissionais de saúde mental.

```sql
CREATE TABLE `professionals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(100) NOT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `bio` text,
  `is_available` boolean NOT NULL DEFAULT true,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do profissional
- `name`: Nome do profissional
- `email`: Email de contato
- `phone`: Telefone
- `specialization`: Especialização (Psicologia, Psiquiatria, etc.)
- `license_number`: Número da licença profissional
- `experience_years`: Anos de experiência
- `bio`: Biografia profissional
- `is_available`: Se está disponível para atendimento
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 7. Tabela: appointments
Armazena os agendamentos de consultas.

```sql
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `professional_id` int NOT NULL,
  `appointment_date` datetime(3) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'scheduled',
  `notes` text,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_user_id_fkey` (`user_id`),
  KEY `appointments_professional_id_fkey` (`professional_id`),
  CONSTRAINT `appointments_professional_id_fkey` FOREIGN KEY (`professional_id`) REFERENCES `professionals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do agendamento
- `user_id`: ID do usuário
- `professional_id`: ID do profissional
- `appointment_date`: Data e hora da consulta
- `status`: Status (scheduled, completed, cancelled)
- `notes`: Observações sobre a consulta
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

### 8. Tabela: educational_resources
Armazena recursos educacionais sobre saúde mental.

```sql
CREATE TABLE `educational_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `content_type` varchar(50) NOT NULL,
  `content_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `is_free` boolean NOT NULL DEFAULT true,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único do recurso
- `title`: Título do recurso
- `description`: Descrição do conteúdo
- `content_type`: Tipo de conteúdo (artigo, vídeo, ebook, etc.)
- `content_url`: URL do conteúdo
- `category`: Categoria do recurso
- `is_free`: Se o recurso é gratuito
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

## Relacionamentos entre Tabelas

### Diagrama de Relacionamentos

```
users (1) ----< (N) test_results (N) >---- (1) tests
 tests (1) ----< (N) questions (1) ----< (N) answers
 users (1) ----< (N) appointments (N) >---- (1) professionals
```

### Descrição dos Relacionamentos

1. **users ↔ test_results ↔ tests**
   - Um usuário pode ter vários resultados de testes
   - Um teste pode ter vários resultados (de diferentes usuários)
   - Relacionamento muitos-para-muitos através da tabela test_results

2. **tests → questions → answers**
   - Um teste tem várias perguntas
   - Uma pergunta pertence a um único teste
   - Uma pergunta tem várias respostas
   - Uma resposta pertence a uma única pergunta

3. **users ↔ appointments ↔ professionals**
   - Um usuário pode ter vários agendamentos
   - Um profissional pode ter vários agendamentos
   - Relacionamento muitos-para-muitos através da tabela appointments

---

## Índices e Performance

### Índices Primários
- Todas as tabelas possuem chave primária auto-incremento (`id`)

### Índices Estrangeiros
- `questions.test_id` → `tests.id`
- `answers.question_id` → `questions.id`
- `test_results.user_id` → `users.id`
- `test_results.test_id` → `tests.id`
- `appointments.user_id` → `users.id`
- `appointments.professional_id` → `professionals.id`

### Índices Únicos
- `users.email` (garante email único)

---

## Configuração do Banco de Dados

### Engine e Charset
- **Engine**: InnoDB (suporte a transações e relacionamentos)
- **Charset**: utf8mb4 (suporte completo a UTF-8, incluindo emojis)
- **Collation**: utf8mb4_unicode_ci (comparação Unicode sem diferenciação de maiúsculas/minúsculas)

### Integridade Referencial
- Todas as chaves estrangeiras configuradas com `ON DELETE CASCADE`
- Garante consistência dos dados ao remover registros

---

## Dados Iniciais

### Testes Pré-cadastrados
1. **Teste de Depressão** - 10 min, 9 questões, Fácil
2. **Teste Compulsão Alimentar** - 15 min, 12 questões, Médio
3. **Teste de Ansiedade** - 12 min, 10 questões, Fácil
4. **Teste Nível de Estresse** - 8 min, 7 questões, Fácil
5. **Teste Nível de Sofrimento Psíquico** - 20 min, 15 questões, Médio
6. **Teste ADHD - Déficit de Atenção** - 25 min, 18 questões, Difícil
7. **Teste ADHD - Hiperatividade** - 25 min, 18 questões, Difícil
8. **Teste Fobia Social** - 15 min, 12 questões, Médio

### Profissionais Exemplo
- Dr. João Silva - Psicologia Clínica
- Dra. Maria Santos - Psiquiatria
- Dr. Pedro Costa - Terapia Cognitivo-Comportamental

---

## Considerações de Segurança

1. **Senhas**: Armazenadas com hash bcrypt (não no banco de dados)
2. **Autenticação**: Baseada em JWT tokens
3. **Dados Sensíveis**: Informações de saúde protegidas
4. **Backup**: Recomendado backup diário dos dados
5. **Acesso**: Controle de acesso baseado em papéis (roles)

---

## Manutenção e Escalabilidade

### Otimizações Recomendadas
1. Adicionar índices compostos para consultas frequentes
2. Implementar particionamento para tabelas grandes (test_results)
3. Configurar cache para consultas recorrentes
4. Monitorar performance das consultas

### Escalabilidade Futura
1. Possibilidade de adicionar mais tabelas de especialidades
2. Suporte a múltiplos idiomas
3. Integração com sistemas de pagamento
4. Expansão para telemedicina