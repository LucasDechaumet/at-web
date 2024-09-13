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
    { field: "type", header: "Type" },
    { field: "numero", header: "Numéro" },
    { field: "expediteur", header: "Expéditeur" },
    { field: "attenduLe", header: "Attendu le" },
    { field: "quantiteColis", header: "Quantité colis" },
    { field: "quantiteArticles", header: "Quantité articles" },
    { field: "statut", header: "Statut" },
    { field: "dateDeReception", header: "Date de réception" },
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
