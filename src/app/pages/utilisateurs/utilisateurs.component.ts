import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { UserService } from "../../services/api/user.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: "app-utilisateurs",
  standalone: true,
  imports: [TableauClassiqueComponent, ToastModule, RippleModule],
  templateUrl: "./utilisateurs.component.html",
  styleUrl: "./utilisateurs.component.scss",
  providers: [MessageService],
})
export class UtilisateursComponent implements OnInit {
  columns = [
    { field: "firstname", header: "Prénom" },
    { field: "lastname", header: "Nom" },
    { field: "email", header: "Email" },
    { field: "role", header: "Rôle" },
    { field: "typeUser", header: "Type d'utilisateur" },
    { field: "updatedAt", header: "Dernière connexion" },
    { field: "state", header: "Etat" },
  ];

  userData: any[] = [];
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private messagerieService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  onToggleChange(user: any) {
    console.log("Toggle change", user);
    const newEnabledState: boolean = !user.enabled;
    console.log("Nouvel état", newEnabledState);

    this.userService.toggleUserEnabled(user.id, newEnabledState).subscribe({
      next: () => {
        user.enabled = newEnabledState;
        this.messagerieService.add({
          severity: "success",
          summary: "Utilisateur mis à jour",
          detail: `L'utilisateur ${user.firstname} ${user.lastname} a été ${
            newEnabledState ? "débloqué" : "bloqué"
          }`,
        });
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur", err);
        this.messagerieService.add({
          severity: "error",
          summary: "Erreur",
          detail: `Erreur lors de la mise à jour de l'utilisateur. Contactez le service informatique.`,
        });
      },
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log("Utilisateurs récupérés", data);
        this.userData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des utilisateurs", err);
        this.loading = false;
      },
    });
  }
}
