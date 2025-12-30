'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const previewRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
      }
    }
  }, [])

  const uploadImage = async (file: File) => {
    setIsUploading(true)
    const objectUrl = URL.createObjectURL(file)
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
    }
    previewRef.current = objectUrl
    setPreviewUrl(objectUrl)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/tests/upload-card-image', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar imagem')
      }

      const data = await response.json()

      if (!data.url) {
        throw new Error('Resposta inválida do servidor')
      }

      onChange(data.url)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      toast.error('Não foi possível enviar a imagem. Tente novamente.')
    } finally {
      setIsUploading(false)
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
        previewRef.current = null
      }
      setPreviewUrl(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isUploading) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (isUploading) return
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))

    if (imageFile) {
      await uploadImage(imageFile)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      await uploadImage(file)
    }
  }

  const handleRemove = () => {
    onChange('')
    if (onRemove) onRemove()
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
      previewRef.current = null
    }
    setPreviewUrl(null)
  }

  const dropEventProps = {
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }

  const displayUrl = previewUrl || value

  return (
    <div className="space-y-4">
      {displayUrl ? (
        <div className="relative group">
          <div
            className={`
              relative w-full h-64 rounded-lg overflow-hidden border-2 transition-all duration-200
              ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-gray-100'}
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            {...dropEventProps}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <img
              src={displayUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onLoad={() => {
                console.log('✔️ Imagem carregada com sucesso:', displayUrl)
              }}
              onError={(e) => {
                console.error('❌ Erro ao carregar imagem:', displayUrl)
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML =
                    '<div class="flex flex-col items-center justify-center h-full text-red-500 p-4"><span class="font-bold mb-2">❌ Erro ao carregar imagem</span><span class="text-sm text-center">URL: ' +
                    displayUrl +
                    '</span><span class="text-xs text-gray-500 mt-2">Verifique se o arquivo existe em public/images/</span></div>'
                }
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 mr-2" />
                Remover
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {previewUrl ? 'Upload em andamento...' : `URL atual: ${value}`}
          </p>
        </div>
      ) : (
        <div
          {...dropEventProps}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`p-4 rounded-full ${isDragging ? 'bg-orange-100' : 'bg-gray-100'}`}
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              ) : (
                <Upload
                  className={`w-8 h-8 ${isDragging ? 'text-orange-600' : 'text-gray-400'}`}
                />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isUploading ? 'Fazendo upload...' : 'Arraste e solte uma imagem aqui'}
              </p>
              <p className="text-xs text-gray-500">
                ou clique para selecionar um arquivo
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ImageIcon className="w-4 h-4" />
              <span>PNG, JPG, GIF até 5MB</span>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p className="font-medium mb-1">{value ? 'Ou altere a URL:' : 'Cole a URL da imagem:'}</p>
        <input
          type="text"
          placeholder="/images/nome-da-imagem.jpg"
          value={value && !value.startsWith('blob:') ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <p className="text-xs text-gray-400 mt-1">
          💡 Use caminhos como: /images/depression-therapy.jpg
        </p>
      </div>
    </div>
  )
}
