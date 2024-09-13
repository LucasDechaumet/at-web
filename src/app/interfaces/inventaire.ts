import { Status } from "../enums/status";

export interface Inventaire {
  id: number;
  storeId: number;
  createdAt: Date;
  pourcentage: number | null;
  quantiteTotal: number | null;
  status: Status;
  commentaire: string | null;
  ecart_plus: number | null;
  ecart_moins: number | null;
  dateStatus: Date | null;
  seuil1: number;
  seuil2: number;
  seuil3: number;
}
