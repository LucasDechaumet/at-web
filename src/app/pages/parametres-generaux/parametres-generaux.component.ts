import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { MenuItem } from "primeng/api";
import { PanelMenuModule } from "primeng/panelmenu";

@Component({
  selector: "app-parametres-generaux",
  standalone: true,
  imports: [CommonModule, RouterOutlet, PanelMenuModule],
  templateUrl: "./parametres-generaux.component.html",
  styleUrl: "./parametres-generaux.component.scss",
})
export class ParametresGenerauxComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: "Inventaire",
        icon: "pi pi-list-check",
        items: [
          {
            label: "Seuil",
            icon: "pi pi-percentage",
            command: () => {
              this.router.navigate(["parametres-generaux/seuil-inventaire"]);
            },
          },
          {
            label: "Paramètres de l'algorithme",
            icon: "pi pi-calculator",
            command: () => {
              this.router.navigate(["parametres-generaux/param-algo"]);
            },
          },
        ],
      },
      {
        label: "Synchronisation",
        icon: "pi pi-sync",
        command: () => {
          this.router.navigate(["parametres-generaux/delai-sauvegarde"]);
        },
      },
      {
        label: "Motif de mouvement",
        icon: "pi pi-tag",
        command: () => {
          this.router.navigate(["parametres-generaux/motif-mouvement"]);
        },
      },
    ];
  }
}
