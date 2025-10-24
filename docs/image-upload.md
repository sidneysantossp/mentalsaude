# Upload de Imagens com Drag and Drop

## Funcionalidade

Sistema de upload de imagens com drag and drop para testes psicológicos, permitindo que administradores adicionem imagens personalizadas aos cards dos testes.

## Componentes

### 1. ImageUpload Component (`/src/components/ui/image-upload.tsx`)

Componente reutilizável que oferece:
- **Drag and Drop**: Arrastar e soltar arquivos de imagem
- **Upload via API**: Envio automático para o servidor
- **URL Manual**: Opção de colar URL diretamente
- **Preview**: Visualização da imagem em tempo real
- **Validação**: Verificação de tipo e tamanho do arquivo
- **Feedback Visual**: Estados de loading, drag active, etc.

#### Props:
- `value?: string` - URL da imagem atual
- `onChange: (url: string) => void` - Callback quando a URL muda
- `onRemove: () => void` - Callback para remover imagem
- `disabled?: boolean` - Desabilitar componente
- `className?: string` - Classes CSS adicionais

### 2. Upload API (`/src/app/api/upload/image/route.ts`)

Endpoint para upload de imagens:
- **Validação**: Tipo de arquivo (JPEG, PNG, GIF, WebP)
- **Tamanho Máximo**: 5MB
- **Armazenamento**: Salva em `/public/uploads/`
- **Nome Único**: Timestamp + string aleatória
- **Retorno**: URL pública da imagem

## Como Usar

### 1. Importação

```tsx
import { ImageUpload } from '@/components/ui/image-upload'
```

### 2. Implementação

```tsx
const [imageUrl, setImageUrl] = useState('')

<ImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  onRemove={() => setImageUrl('')}
  disabled={loading}
/>
```

## Fluxo de Upload

1. **Usuário arrasta imagem** → Componente detecta drag enter
2. **Usuário solta imagem** → Componente processa arquivo
3. **Validação** → Verifica tipo e tamanho
4. **Upload** → Envia para `/api/upload/image`
5. **Processamento** → Salva arquivo no servidor
6. **Retorno** → URL pública é retornada
7. **Atualização** → Componente exibe preview

## Validações

### Tipos de Arquivo Permitidos
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/gif`
- `image/webp`

### Limitações
- **Tamanho Máximo**: 5MB
- **Dimensões**: Não há limite (recomendado 1024x1024)
- **Quantidade**: 1 arquivo por upload

## Estrutura de Arquivos

```
public/
├── uploads/
│   ├── test-1699123456789-abc123.jpg
│   ├── test-1699123456790-def456.png
│   └── ...
└── images/
    ├── placeholder.jpg
    └── ...
```

## Tratamento de Erros

### Erros Comuns
- **Tipo inválido**: "Por favor, selecione apenas arquivos de imagem."
- **Arquivo grande**: "A imagem deve ter no máximo 5MB."
- **Upload falhou**: "Erro ao fazer upload da imagem. Tente novamente."

### Fallback
- Se a URL falhar ao carregar, exibe `/images/placeholder.jpg`
- Se o upload falhar, mantém o estado anterior

## Integração com Formulários

### Formulário de Edição
```tsx
// /admin/tests/[id]/page.tsx
<ImageUpload
  value={formData.imageUrl}
  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
  onRemove={() => setFormData({ ...formData, imageUrl: '' })}
  disabled={saving}
/>
```

### Formulário de Criação
```tsx
// /admin/tests/new/page.tsx
<ImageUpload
  value={formData.imageUrl}
  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
  onRemove={() => setFormData({ ...formData, imageUrl: '' })}
  disabled={loading}
/>
```

## Exibição Frontend

### Página de Testes
```tsx
// /tests/page.tsx
<img 
  src={test.image} // Usa imageUrl personalizada ou fallback
  alt={test.title}
  className="w-full h-full object-cover"
/>
```

### Home Page
```tsx
// /page.tsx
<img 
  src={test.image} // Usa imageUrl personalizada ou fallback
  alt={test.title}
  className="w-full h-full object-cover"
/>
```

## API Response

### Sucesso
```json
{
  "success": true,
  "url": "/uploads/test-1699123456789-abc123.jpg",
  "filename": "test-1699123456789-abc123.jpg"
}
```

### Erro
```json
{
  "error": "Tipo de arquivo não permitido"
}
```

## Segurança

- **Validação no Cliente**: Verificação antes do upload
- **Validação no Servidor**: Verificação no endpoint
- **Nomes Únicos**: Prevenção de sobrescrita
- **Tipos Permitidos**: Apenas imagens
- **Tamanho Limitado**: Prevenção de abuso

## Performance

- **Lazy Loading**: Imagens carregam sob demanda
- **Otimização**: Recomendado usar WebP
- **Cache**: Browser cache automático
- **CDN**: Pode ser configurado para `/uploads/`

## Melhorias Futuras

- [ ] Compressão automática de imagens
- [ ] Redimensionamento inteligente
- [ ] Integração com CDN
- [ ] Crop e edição de imagem
- [ ] Múltiplos uploads
- [ ] Galeria de imagens reutilizáveis