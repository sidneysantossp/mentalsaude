import express from "express";
import { createApp } from "./server/_core/app";

// A presença do import de Express no entrypoint raiz permite que a Vercel
// reconheça este projeto como aplicação Express nativa e encaminhe `/api/*`
// para os middlewares registrados em `createApp`.
const app: ReturnType<typeof express> = createApp();

export default app;
