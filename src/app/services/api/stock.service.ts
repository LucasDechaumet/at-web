import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Stock } from "../../interfaces/stock";

@Injectable({
  providedIn: "root",
})
export class StockService {
  constructor(private http: HttpService) {}

  baseUrl = "stock";

  getStockByEan(ean: string) {
    return this.http.get<Stock>(`${this.baseUrl}/getStockByEan?ean=${ean}`);
  }
}
