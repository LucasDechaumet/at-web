import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class CodePinService {
  baseUrl = "code-pin";

  constructor(private http: HttpService) {}

  getActiveRequests() {
    return this.http.get<any[]>(`${this.baseUrl}/active-requests`);
  }

  getActiveAndCompletedRequests() {
    return this.http.get<any[]>(`${this.baseUrl}/active-completed-requests`);
  }
}
