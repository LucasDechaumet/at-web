import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ParamAlgo } from "../../pages/parametres-generaux/components/param-algo/param-algo.component";

@Injectable({
  providedIn: "root",
})
export class ParamInventaireAlgoService {
  baseUrl = "param-inventaire-algo";

  constructor(private http: HttpService) {}

  getParamInventaireAlgo() {
    return this.http.get<any>(`${this.baseUrl}/getParams`);
  }

  addParam(body: any) {
    return this.http.post<any>(`${this.baseUrl}/addParam`, body);
  }

  deleteParam(id: number) {
    console.log("id", id);
    return this.http.delete<any>(`${this.baseUrl}/deleteParam/${id}`);
  }

  updateParam(product: ParamAlgo) {
    return this.http.put<any>(`${this.baseUrl}/updateParam`, product);
  }
}
