import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Param } from "../../interfaces/param";

@Injectable({
  providedIn: "root",
})
export class ParamService {
  baseUrl = "param";

  constructor(private http: HttpService) {}

  getParamsByModuleAndStoreIdAndCodeparam(
    module: string,
    codeparam: string,
    storeId: number
  ) {
    return this.http.get<Param[]>(
      `${this.baseUrl}/getParamsByModuleAndStoreIdAndCodeparam?module=${module}&codeparam=${codeparam}&storeId=${storeId}`
    );
  }

  updateParams(body: any) {
    return this.http.patch<Param>(`${this.baseUrl}/updateParams`, body);
  }
}
