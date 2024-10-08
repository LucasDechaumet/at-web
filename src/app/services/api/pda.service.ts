import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class PdaService {
  baseUrl = "pda";

  constructor(private http: HttpService) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
