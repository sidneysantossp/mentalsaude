'use client'

export default function TestImagesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Teste de Imagens</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teste 1: Caminho Relativo</h2>
          <p className="text-sm text-gray-600">URL: /images/depression-therapy.jpg</p>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <img 
              src="/images/depression-therapy.jpg" 
              alt="Teste 1"
              className="w-full h-64 object-cover"
              onLoad={() => console.log('✅ Imagem 1 carregada')}
              onError={() => console.error('❌ Erro ao carregar imagem 1')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teste 2: Next Image</h2>
          <p className="text-sm text-gray-600">Usando componente Image do Next.js</p>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <img 
              src="/images/anxiety-meditation.jpg" 
              alt="Teste 2"
              className="w-full h-64 object-cover"
              onLoad={() => console.log('✅ Imagem 2 carregada')}
              onError={() => console.error('❌ Erro ao carregar imagem 2')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teste 3: Outra Imagem</h2>
          <p className="text-sm text-gray-600">URL: /images/healthy-eating.jpg</p>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <img 
              src="/images/healthy-eating.jpg" 
              alt="Teste 3"
              className="w-full h-64 object-cover"
              onLoad={() => console.log('✅ Imagem 3 carregada')}
              onError={() => console.error('❌ Erro ao carregar imagem 3')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Teste 4: Background Image</h2>
          <p className="text-sm text-gray-600">Usando background-image CSS</p>
          <div 
            className="border-2 border-gray-300 rounded-lg h-64 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/adhd-focus.jpg)' }}
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Instruções:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Abra o console do navegador (F12)</li>
          <li>Verifique se há mensagens de erro</li>
          <li>Verifique se as imagens carregaram (mensagens ✅)</li>
          <li>Se houver erro 404, o problema é com o servidor Next.js</li>
        </ol>
      </div>
    </div>
  )
}
