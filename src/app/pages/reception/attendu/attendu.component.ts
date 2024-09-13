import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../../components/tableau-classique/tableau-classique.component";
import { SidebarModule } from "primeng/sidebar";
import { TimelineModule } from "primeng/timeline";

@Component({
  selector: "app-attendu",
  standalone: true,
  imports: [TableauClassiqueComponent, SidebarModule, TimelineModule],
  templateUrl: "./attendu.component.html",
  styleUrl: "./attendu.component.scss",
})
export class AttenduComponent implements OnInit {
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

  events: any[] = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },
  ];

  data: any[] = [
    {
      type: "Commande",
      numero: "123456",
      expediteur: "Fournisseur A",
      attenduLe: "2024-08-20",
      quantiteColis: 10,
      quantiteArticles: 100,
      statut: "En attente",
      dateDeReception: null,
    },
    {
      type: "Retour",
      numero: "654321",
      expediteur: "Client B",
      attenduLe: "2024-08-22",
      quantiteColis: 5,
      quantiteArticles: 50,
      statut: "En cours",
      dateDeReception: null,
    },
    {
      type: "Livraison",
      numero: "789012",
      expediteur: "Fournisseur C",
      attenduLe: "2024-08-25",
      quantiteColis: 15,
      quantiteArticles: 150,
      statut: "Livré",
      dateDeReception: "2024-08-26",
    },
    {
      type: "Retour",
      numero: "210987",
      expediteur: "Client D",
      attenduLe: "2024-08-18",
      quantiteColis: 8,
      quantiteArticles: 80,
      statut: "Reçu",
      dateDeReception: "2024-08-19",
    },
  ];
  loading: boolean = true;
  sidebarVisible: boolean = false;

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }
  onRowClicked($event: any) {
    this.sidebarVisible = true;
  }
  fetchData() {
    this.loading = false;
  }
}
