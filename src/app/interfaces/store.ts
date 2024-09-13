export interface Store {
  id: number;
  name: string;
  storeType: string | null;
  language: string;
  storeStatus: string | null;
  addressLine1: string;
  addressLine2: string | null;
  zip: string;
  city: string;
  countryCode: string;
  libCountry: string;
  contactPhone: string;
  contactEmail: string;
  debutFermetureTemp: string | null;
  finFermetureTemp: string | null;
  dateOuverture: string;
  dateFermeture: string;
  idSession: number;
  createdAt: string;
  updatedAt: string;
  activationDate: string | null;
  isRfidStore: boolean | null;
}
