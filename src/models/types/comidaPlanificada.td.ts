import type { z } from "zod";
import type { comidaPlanificadaSchema } from "../schemas/comidaPlanificadaSchema";

export type comidaPlanificada = z.infer<typeof comidaPlanificadaSchema>