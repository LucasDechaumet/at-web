import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Inventaire } from "../../interfaces/inventaire";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InventaireService {
  baseUrl = "inventory";

  constructor(private http: HttpService) {}

  getInventories(storeId: number) {
    return this.http.get<Inventaire[]>(`${this.baseUrl}/getInventories/${storeId}`);
  }

  getInventoryDetailsByFamille(inventoryId: number) {
    return this.http
      .get<any>(`${this.baseUrl}/getInventoryDetailsByFamille/${inventoryId}`)
      .pipe(
        map((data) => {
          const labelsData: string[] = [];
          const valuesData: number[] = [];
          data.forEach((el: any) => {
            labelsData.push(el[0]);
            valuesData.push(el[1]);
          });
          return { labelsData, valuesData };
        })
      );
  }

  countEpcMissing(inventoryId: number) {
    return this.http.get<number>(`${this.baseUrl}/countEpcMissing/${inventoryId}`);
  }

  getEanByFamille(inventoryId: number, famille: string) {
    return this.http.get<any>(
      `${this.baseUrl}/getEanByFamille?inventoryId=${inventoryId}&famille=${famille}`
    );
  }

  qualifyInventory() {}
}
