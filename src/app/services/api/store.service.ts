import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Store } from "../../interfaces/store";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private http: HttpService) {}

  baseUrl = "store";

  getStores() {
    return this.http.get<Store[]>(`${this.baseUrl}/getStores`);
  }
}
