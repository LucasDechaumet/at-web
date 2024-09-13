import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-acces",
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, CheckboxModule],
  templateUrl: "./acces.component.html",
  styleUrl: "./acces.component.scss",
})
export class AccesComponent {
  roles: string[] = ["Magasin", "DM", "AC", "DV", "DC", "Admin", "Super-Admin"];

  permissions: any[] = [
    { name: "Permissions liées à l'inventaire", isCategoryHeader: true },
    {
      name: "Modifier les seuils d'inventaire",
      magasin: false,
      dm: false,
      ac: true,
      dv: true,
      dc: false,
      admin: true,
      superAdmin: false,
      isCategoryHeader: false,
    },
    {
      name: "Valider un inventaire",
      magasin: false,
      dm: true,
      ac: true,
      dv: false,
      dc: false,
      admin: false,
      superAdmin: false,
      isCategoryHeader: false,
    },
    { name: "Permissions liées aux utilisateurs", isCategoryHeader: true },
    {
      name: "Gérer les utilisateurs",
      magasin: false,
      dm: false,
      ac: false,
      dv: false,
      dc: true,
      admin: true,
      superAdmin: true,
      isCategoryHeader: false,
    },
    // Ajouter d'autres permissions et catégories ici
  ];
}
