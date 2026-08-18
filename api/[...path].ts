import { createApp } from "../server/_core/app";

// O roteamento de arquivo da Vercel entrega todas as chamadas `/api/*` ao
// Express; o frontend Vite continua estático e é servido pelo CDN.
export default createApp();
