export interface Stock {
  ean: string;
  sku: string;
  stockDispoDepot: number;
  stockDedieEcommerce: number;
  livraisonPrevue: string;
  quantiteEnLivraison: number;
  idSession: number;
  createdAt: Date;
  updatedAt: Date;
}
