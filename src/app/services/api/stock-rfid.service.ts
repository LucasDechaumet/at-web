import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { StockRfid } from "../../interfaces/stock-rfid";

@Injectable({
  providedIn: "root",
})
export class StockRfidService {
  baseUrl = "stock-rfid";

  constructor(private http: HttpService) {}

  countByEanAndStoreId(ean: string, storeId: number) {
    return this.http.get<StockRfid>(
      `${this.baseUrl}/countByEanAndStoreId?ean=${ean}&storeId=${storeId}`
    );
  }

  getStockRfidByEpc(epc: string) {
    return this.http.get<StockRfid>(`${this.baseUrl}/getStockRfidByEpc/${epc}`);
  }

  verifyAvailability(epc: string, storeId: number, disponible: number) {
    return this.http.get<any>(
      `${this.baseUrl}/verifyAvailability?epc=${epc}&storeId=${storeId}&disponible=${disponible}`
    );
  }

  updateAvailability(body: any) {
    return this.http.post(`${this.baseUrl}/updateAvailability`, body);
  }
}
