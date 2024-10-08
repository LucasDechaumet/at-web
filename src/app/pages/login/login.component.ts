import { Component } from "@angular/core";
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
import { Router } from "@angular/router";
import { UserService } from "../../services/api/user.service";

@Component({
  selector: "app-login",
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
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [MessageService],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  loading: boolean = false;
  isForgotPassword: boolean = false; // Gestion de l'état du formulaire
  disabled: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    if (this.isForgotPassword) {
      this.requestPasswordReset(); // Appel de la méthode de réinitialisation de mot de passe
    } else {
      this.login(); // Appel de la méthode de connexion
    }
  }

  // Méthode de connexion classique
  // Méthode de connexion classique
  login() {
    this.loading = true;
    this.authService.signIn(this.email, this.password).subscribe({
      next: (result) => {
        this.loading = false;
        if (result.success) {
          this.router.navigate(["/stock"]);
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: error.message,
          key: "bc",
          life: 3000,
        });
      },
    });
  }

  // Méthode pour envoyer la requête de réinitialisation de mot de passe
  requestPasswordReset() {
    this.loading = true;
    this.disabled = true;
    this.userService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        this.showSuccess();
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404) {
          this.messageService.add({
            severity: "warn",
            summary: "Utilisateur non trouvé",
            detail: "Aucun utilisateur n'a été trouvé avec cette adresse email.",
            key: "bc",
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Une erreur s'est produite. Contactez le service informatique.",
            key: "bc",
            life: 3000,
          });
        }
        this.disabled = false;
      },
    });
  }

  // Méthode pour afficher un message de succès
  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: "Email envoyé",
      detail:
        "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email.",
      key: "bc",
      life: 3000,
    });
  }

  // Méthode appelée lors du clic sur le lien "mot de passe oublié"
  onForgotPasswordClick(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.isForgotPassword = !this.isForgotPassword; // Basculer l'état du formulaire
    this.disabled = false;
    // console.log(this.isForgotPassword);
  }
}
