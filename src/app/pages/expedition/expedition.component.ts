import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { SpeedDialModule } from "primeng/speeddial";

@Component({
  selector: "app-expedition",
  standalone: true,
  imports: [TableauClassiqueComponent, SpeedDialModule],
  templateUrl: "./expedition.component.html",
  styleUrl: "./expedition.component.scss",
})
export class ExpeditionComponent implements OnInit {
  columns = [
    { field: "type", header: "Type" },
    { field: "numero", header: "Numéro" },
    { field: "destinataire", header: "Destinataire" },
    { field: "motif", header: "Motif" },
    { field: "date", header: "Date" },
    { field: "nbSkuDifferent", header: "Nb. SKU différent" },
    { field: "quantiteArticles", header: "Quantité articles" },
    { field: "statut", header: "Statut" },
    { field: "imprimer", header: "Imprimer" },
  ];
  items = [
    {
      icon: "pi pi-plus",
    },
    {
      icon: "pi pi-refresh",
    },
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
