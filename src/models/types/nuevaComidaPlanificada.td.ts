import type { z } from "zod";
import type { nuevaComidaPlanificada } from "../schemas/nuevaComidaPlanificadaSchema";

export type nuevaComidaPlanificada = z.infer<typeof nuevaComidaPlanificada>