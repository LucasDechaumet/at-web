import { Component, OnInit } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { TagModule } from "primeng/tag";
import { ToggleButtonModule } from "primeng/togglebutton";
import { DateFormatPipe } from "../../../pipes/date-format.pipe";
import { CheckboxModule } from "primeng/checkbox";
import { CodePinService } from "../../../services/api/code-pin.service";

@Component({
  selector: "app-demandes-pda",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SidebarModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    InputSwitchModule,
    DateFormatPipe,
    TagModule,
    ToggleButtonModule,
    ToastModule,
    RippleModule,
    CheckboxModule,
  ],
  templateUrl: "./demandes-pda.component.html",
  styleUrl: "./demandes-pda.component.scss",
  providers: [MessageService],
})
export class DemandesPdaComponent implements OnInit {
  columns = [
    { field: "createdAt", header: "Date de demande" },
    { field: "description", header: "Description" },
    { field: "pin", header: "Code" },
    { field: "state", header: "Etat" },
    { field: "endedAt", header: "Date de clôture" },
  ];

  codePinData: any[] = [];
  loading: boolean = true;
  globalFilterFields: string[] = [];
  checked: boolean = false;

  constructor(
    private messageService: MessageService,
    private codePinService: CodePinService
  ) {}

  ngOnInit(): void {
    this.globalFilterFields = this.columns.map((col) => col.field);
    this.fetchActiveRequest(); // Charger les requêtes actives par défaut
  }

  // Méthode appelée lors du changement d'état de la case à cocher
  onCheckboxChange(checked: boolean): void {
    this.loading = true; // Activer l'indicateur de chargement

    if (checked) {
      this.fetchActiveAndCompletedRequests(); // Charger toutes les requêtes si la case est cochée
    } else {
      this.fetchActiveRequest(); // Charger uniquement les requêtes actives si la case est décochée
    }
  }

  fetchActiveRequest(): void {
    this.codePinService.getActiveRequests().subscribe({
      next: (data) => {
        console.log(data);
        this.codePinData = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Erreur lors de la récupération des données. Contactez le service informatique.",
        });
        this.loading = false;
      },
    });
  }

  fetchActiveAndCompletedRequests(): void {
    this.codePinService.getActiveAndCompletedRequests().subscribe({
      next: (data) => {
        console.log(data);
        this.codePinData = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Erreur lors de la récupération des données. Contactez le service informatique.",
        });
        this.loading = false;
      },
    });
  }

  getTagSeverity(state: string): "success" | "warning" {
    return state === "Terminé" ? "success" : "warning";
  }
}
