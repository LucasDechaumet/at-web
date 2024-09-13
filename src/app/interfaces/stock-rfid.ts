export interface StockRfid {
  epc: string;
  store_id: number;
  statut: string;
  ean: string;
  disponible: number;
  in_stock: number;
  alarme: Date;
  emplacement: string;
  created_at: Date;
  updated_at: Date;
  ignored: number;
  origin: string;
  sku: string;
  libproduit: string;
  libcolorismodifie: string;
  libtaille: string;
}
