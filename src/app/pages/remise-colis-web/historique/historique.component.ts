import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../../components/tableau-classique/tableau-classique.component";

@Component({
  selector: "app-historique",
  standalone: true,
  imports: [TableauClassiqueComponent],
  templateUrl: "./historique.component.html",
  styleUrl: "./historique.component.scss",
})
export class HistoriqueComponent implements OnInit {
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
{
}
