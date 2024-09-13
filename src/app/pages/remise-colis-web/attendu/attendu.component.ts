import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../../components/tableau-classique/tableau-classique.component";
import { SpeedDialModule } from "primeng/speeddial";

@Component({
  selector: "app-attendu",
  standalone: true,
  imports: [TableauClassiqueComponent, SpeedDialModule],
  templateUrl: "./attendu.component.html",
  styleUrl: "./attendu.component.scss",
})
export class AttenduComponent implements OnInit {
  columns = [
    { field: "numeroDeColis", header: "Numéro de colis" },
    { field: "codeBarres", header: "Code-barres" },
    { field: "dateDeCreation", header: "Date de création" },
    { field: "destinataire", header: "Destinataire" },
    { field: "statut", header: "Statut" },
  ];
  data: any[] = [];
  loading: boolean = true;

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.loading = false;
  }
}
