import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "user";
  constructor(private httpService: HttpService) {}

  requestPasswordReset(email: string) {
    return this.httpService.post(`${this.baseUrl}/request-reset-password`, { email });
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.httpService.post(`${this.baseUrl}/reset-password`, {
      token,
      password,
      confirmPassword,
    });
  }

  getUsers() {
    return this.httpService.get(`${this.baseUrl}/getUsers`);
  }

  toggleUserEnabled(id: string, enabled: boolean) {
    return this.httpService.patch(`${this.baseUrl}/toggle-user-enabled`, { id, enabled });
  }
}
