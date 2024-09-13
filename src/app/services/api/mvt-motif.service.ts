import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class MvtMotifService {
  baseUrl = "mvt_motif";

  constructor(private httpService: HttpService) {}

  getMotifsByItemType(itemType: string) {
    return this.httpService.get(`${this.baseUrl}/getMotifsByItemType/${itemType}`);
  }
}
