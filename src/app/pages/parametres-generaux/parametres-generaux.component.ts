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
            label: "Delai de sauvegarde",
            icon: "pi pi-save",
            command: () => {
              this.router.navigate(["parametres-generaux/delai-sauvegarde"]);
            },
          },
        ],
      },
      {
        label: "Synchronisation",
        icon: "pi pi-tag",
        command: () => {
          this.router.navigate(["parametres-generaux/delai-sauvegarde"]);
        },
      },
    ];
  }
}
