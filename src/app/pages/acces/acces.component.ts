import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { CommonModule } from "@angular/common";
import { PermissionService } from "../../services/api/permission.service";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-acces",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: "./acces.component.html",
  styleUrls: ["./acces.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class AccesComponent implements OnInit {
  roles: string[] = ["Mag", "Dm", "Ac", "Dv", "Dirc", "Support", "Admin"];
  permissions: any[] = [];
  originalState: boolean = false;
  loading: boolean = true;

  constructor(
    private permissionService: PermissionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchPermissions();
  }

  fetchPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: (response: any) => {
        this.permissions = this.flattenPermissions(response);
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Contactez le service informatique",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  flattenPermissions(data: any[]) {
    let flatPermissions: { isCategoryHeader: boolean; name: any }[] = [];
    data.forEach((category) => {
      flatPermissions.push({ isCategoryHeader: true, name: category.category });
      category.permissions.forEach((permission: any) => {
        flatPermissions.push({ ...permission, isCategoryHeader: false });
      });
    });
    return flatPermissions;
  }

  isCategoryHeader(permission: any): boolean {
    return permission.isCategoryHeader;
  }

  // Méthode pour gérer le changement de rôle avec confirmation avant mise à jour
  onRoleChange(event: MouseEvent, permission: any, role: string) {
    // Empêcher le changement immédiat
    event.preventDefault();

    // Stocker l'état actuel de la case à cocher avant modification
    const roleKey = role.toLowerCase();
    this.originalState = permission[roleKey]; // Enregistrer l'état initial

    // Utilisation de l'événement natif pour afficher la confirmation à l'endroit cliqué
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Do you want to change this permission?",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-sm",
      accept: () => {
        // Mettre à jour la permission localement et sur le serveur
        permission[roleKey] = !this.originalState; // Inverser l'état localement
        this.permissionService
          .updatePermission({
            permissionName: permission.name,
            role: role,
            value: permission[roleKey],
          })
          .subscribe({
            next: (response) => {
              this.messageService.add({
                severity: "success",
                summary: "Confirmation",
                detail: "La permission a été modifiée avec succès",
                life: 3000,
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: "error",
                summary: "Erreur",
                detail: "Contactez le service informatique",
                life: 3000,
              });
              permission[roleKey] = this.originalState;
            },
          });
      },
      reject: () => {
        // Restaurer l'état original si l'utilisateur clique sur "No"
        permission[roleKey] = this.originalState;
        this.messageService.add({
          severity: "error",
          summary: "Annulation",
          detail: "La permission n'a pas été modifiée",
          life: 3000,
        });
      },
    });
  }
}
