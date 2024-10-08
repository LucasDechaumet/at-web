import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  baseUrl = "permission";

  constructor(private httpService: HttpService) {}

  getPermissions() {
    return this.httpService.get(`${this.baseUrl}/getPermissions`);
  }

  updatePermission(arg0: { permissionName: string; role: string; value: any }) {
    console.log(arg0);
    return this.httpService.patch(`${this.baseUrl}/updatePermission`, arg0);
  }
}
