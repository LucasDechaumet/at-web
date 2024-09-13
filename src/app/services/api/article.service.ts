import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Article } from "../../interfaces/article";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  baseUrl = "article";

  constructor(private http: HttpService) {}

  getArticlesByStoreId(storeId: number) {
    return this.http.get<Article[]>(
      `${this.baseUrl}/getArticlesByStoreId?storeId=${storeId}`
    );
  }

  getPhotoUrlByEan(ean: string): Observable<string> {
    return this.http.getText(`${this.baseUrl}/getPhotoUrlByEan/${ean}`);
  }
}
