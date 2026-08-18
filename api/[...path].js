import { createApp } from "./app.js";

// A função JavaScript evita a validação de tipos do builder Vercel sobre os
// módulos Express existentes. O build gera `api/app.js` com as dependências
// internas TypeScript já empacotadas e entrega todas as rotas `/api/*` ao mesmo app.
export default createApp();
