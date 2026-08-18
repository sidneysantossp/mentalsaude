import { createApp } from "../server/_core/app";

// A função JavaScript evita a validação de tipos do builder Vercel sobre os
// módulos Express existentes. O bundler da plataforma transpila as dependências
// TypeScript importadas e entrega todas as rotas `/api/*` ao mesmo app.
export default createApp();
