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
    { field: "destinataire", header: "Destinataire" },
    { field: "dateDeCreation", header: "Date de création" },
    { field: "qtColis", header: "Qt colis" },
    { field: "quantiteArticles", header: "Quantité articles" },
    { field: "dateDenlevement", header: "Date d’enlèvement" },
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
