#!/bin/bash

# 🚀 SCRIPT COMPLETO - ENVIO PARA GITHUB
# Execute este script no seu ambiente local

echo "🚀 PROJETO MENTAL SAÚDE - ENVIO PARA GITHUB"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar se estamos no branch correto
echo -e "${BLUE}📋 Configurando branch principal...${NC}"
git branch -M main

# Verificar se GitHub CLI está instalado
if command_exists gh; then
    echo -e "${GREEN}✅ GitHub CLI encontrado!${NC}"
    echo ""
    echo -e "${YELLOW}🤔 Como você quer criar o repositório?${NC}"
    echo "1) Criar repositório PÚBLICO com GitHub CLI"
    echo "2) Criar repositório PRIVADO com GitHub CLI"
    echo "3) Configurar manualmente (já criado no GitHub)"
    echo ""
    read -p "Escolha uma opção (1-3): " choice
    
    case $choice in
        1)
            echo -e "${BLUE}📤 Criando repositório público...${NC}"
            gh repo create mental-saude --public --source=. --remote=origin --push
            ;;
        2)
            echo -e "${BLUE}📤 Criando repositório privado...${NC}"
            gh repo create mental-saude --private --source=. --remote=origin --push
            ;;
        3)
            echo -e "${BLUE}⚙️ Configurando manualmente...${NC}"
            echo "Por favor, crie o repositório manualmente em: https://github.com/new"
            echo ""
            read -p "Digite a URL do seu repositório: " repo_url
            git remote add origin $repo_url
            git push -u origin main
            ;;
        *)
            echo -e "${RED}❌ Opção inválida${NC}"
            exit 1
            ;;
    esac
else
    echo -e "${YELLOW}⚠️ GitHub CLI não encontrado${NC}"
    echo ""
    echo -e "${BLUE}📋 Opções disponíveis:${NC}"
    echo "1) Criar repositório manualmente"
    echo "2) Tentar nomes alternativos"
    echo ""
    read -p "Escolha uma opção (1-2): " choice
    
    case $choice in
        1)
            echo -e "${BLUE}📋 Instruções para criação manual:${NC}"
            echo "1. Acesse: https://github.com/new"
            echo "2. Nome do repositório: mental-saude"
            echo "3. Descrição: Sistema completo de saúde mental"
            echo "4. Escolha público ou privado"
            echo "5. NÃO inicialize com README"
            echo "6. Clique em 'Create repository'"
            echo ""
            read -p "Digite a URL do repositório criado: " repo_url
            git remote add origin $repo_url
            ;;
        2)
            echo -e "${BLUE}🔄 Tentando nomes alternativos...${NC}"
            names=("mental-saude" "mental-health-app" "mental-saude-platform" "mental-health-platform" "saude-mental-app")
            
            for name in "${names[@]}"; do
                echo -e "${YELLOW}🔍 Testando: https://github.com/sidneysantossp/$name${NC}"
                if curl -s -o /dev/null -w "%{http_code}" "https://github.com/sidneysantossp/$name" | grep -q "200\|404"; then
                    if curl -s -o /dev/null -w "%{http_code}" "https://github.com/sidneysantossp/$name" | grep -q "200"; then
                        echo -e "${RED}❌ Já existe: $name${NC}"
                        continue
                    else
                        echo -e "${GREEN}✅ Disponível: $name${NC}"
                        read -p "Usar este nome? (s/n): " use_name
                        if [[ $use_name =~ ^[Ss]$ ]]; then
                            git remote add origin "https://github.com/sidneysantossp/$name.git"
                            echo -e "${BLUE}📤 Configurado com: $name${NC}"
                            break
                        fi
                    fi
                fi
            done
            ;;
        *)
            echo -e "${RED}❌ Opção inválida${NC}"
            exit 1
            ;;
    esac
    
    # Tentar enviar
    echo -e "${BLUE}📤 Enviando para GitHub...${NC}"
    git push -u origin main
fi

# Verificar se o envio foi bem-sucedido
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 SUCESSO! Projeto enviado para GitHub!${NC}"
    echo ""
    echo -e "${BLUE}🔐 Credenciais de Acesso:${NC}"
    echo "   Email: sid.websp@gmail.com"
    echo "   Senha: Admin@2024!"
    echo ""
    echo -e "${BLUE}🚀 Próximos passos:${NC}"
    echo "   1. Configure o deploy na Vercel"
    echo "   2. Conecte o repositório do GitHub"
    echo "   3. Configure as variáveis de ambiente"
    echo "   4. Faça o deploy!"
else
    echo ""
    echo -e "${RED}❌ Falha no envio${NC}"
    echo -e "${YELLOW}🔧 Verifique:${NC}"
    echo "   - Suas credenciais do GitHub"
    echo "   - Se o repositório existe"
    echo "   - Sua conexão com a internet"
fi