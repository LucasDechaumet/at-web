import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../../components/tableau-classique/tableau-classique.component";

@Component({
  selector: "app-attendu",
  standalone: true,
  imports: [TableauClassiqueComponent],
  templateUrl: "./attendu.component.html",
  styleUrl: "./attendu.component.scss",
})
export class AttenduComponent implements OnInit {
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
