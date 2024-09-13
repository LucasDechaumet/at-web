export interface Param {
  id: number;
  module: string;
  storeId: string | null; // storeId peut être de type string ou null
  codeparam: string;
  value: string;
  libelle: string;
}
