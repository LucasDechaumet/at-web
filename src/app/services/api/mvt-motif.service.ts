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

  getMotifs() {
    return this.httpService.get<any>(`${this.baseUrl}/getMotifs`);
  }

  addMotif(motif: any) {
    return this.httpService.post<any>(`${this.baseUrl}/addMotif`, motif);
  }

  updateMotif(motif: any) {
    return this.httpService.put<any>(`${this.baseUrl}/updateMotif`, motif);
  }

  deleteMotif(id: number) {
    return this.httpService.delete<any>(`${this.baseUrl}/deleteMotif/${id}`);
  }
}
