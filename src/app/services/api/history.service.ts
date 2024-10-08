import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  baseUrl = "history";
  constructor(private http: HttpService) {}

  getHistoriesByType(type: string, storeId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/getHistoriesByType?type=${type}&storeId=${storeId}`
    );
  }

  getHistories(
    storeId: number,
    startDate: string,
    endDate: string,
    offset: number,
    size: number
  ) {
    return this.http.get<any[]>(
      `${this.baseUrl}/getHistories?storeId=${storeId}&startDate=${startDate}&endDate=${endDate}&offset=${offset}&size=${size}`
    );
  }
}
