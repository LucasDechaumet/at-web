import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/api/auth.service";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { MessageService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserService } from "../../services/api/user.service";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [MessageService],
})
export class ResetPasswordComponent implements AfterViewInit {
  token: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"];
      this.decodeToken();
    });
  }

  // Méthode pour décoder le token et vérifier l'expiration
  decodeToken() {
    try {
      const decodedToken = jwtDecode<JwtPayload>(this.token);

      if (decodedToken.sub) {
        this.email = decodedToken.sub;
        console.log("Email:", this.email);
      } else {
        throw new Error("L'email n'est pas présent dans le token.");
      }

      // Vérifier si le token est expiré
      const currentTime = Math.floor(Date.now() / 1000);
      console.log("Token expiré à:", decodedToken.exp);
      console.log("Temps actuel:", currentTime);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log("Le lien de réinitialisation du mot de passe a expiré.");
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Le lien de réinitialisation du mot de passe a expiré.",
          key: "bc",
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 3000);
      }
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail:
          "Le lien de réinitialisation du mot de passe est invalide. Veuillez contacter le service informatique.",
        key: "bc",
        life: 3000,
      });
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 5000);
    }
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    // Vérifier si le mot de passe a au moins 4 caractères
    if (this.password.length < 4) {
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail: "Le mot de passe doit contenir au moins 4 caractères.",
        key: "bc",
        life: 3000,
      });
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail: "Les mots de passe ne correspondent pas.",
        key: "bc",
        life: 3000,
      });
      return;
    }

    // Sauvegarder le mot de passe si les vérifications sont correctes
    this.save();
  }

  // Méthode pour sauvegarder le nouveau mot de passe
  save() {
    this.loading = true;
    this.userService
      .resetPassword(this.token, this.password, this.confirmPassword)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.messageService.add({
            severity: "success",
            summary: "Succès",
            detail: "Votre mot de passe a été réinitialisé avec succès.",
            key: "bc",
            life: 3000,
          });
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2500);
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Une erreur s'est produite. Contactez le service informatique.",
            key: "bc",
            life: 3000,
          });
        },
      });
  }
}
