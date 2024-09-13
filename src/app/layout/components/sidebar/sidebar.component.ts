import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { ISidebarItem } from "./ISidebarItem";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/api/auth.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public sidebarConfig = this.sidebarService.sidebarConfig;
  public router: Router = inject(Router);
  items: ISidebarItem[] = [
    {
      title: "Articles",
      children: [
        {
          title: "Stock",
          icon: "pi-warehouse",
          path: "/stock",
        },
        {
          title: "Inventaire",
          icon: "pi-list-check",
          path: "/inventaire",
        },
        {
          title: "Mouvement",
          icon: "pi-arrow-right-arrow-left",
          path: "/mouvement",
        },
      ],
    },
    {
      title: "Colis",
      children: [
        {
          title: "Réception",
          icon: "pi-truck",
          children: [
            {
              title: "En attente",
              icon: "pi-list",
              path: "/reception/attendu",
            },
            {
              title: "Historique",
              icon: "pi-list-check",
              path: "/reception/historique",
            },
          ],
        },
        {
          title: "Expédition",
          icon: "pi-box",
          path: "/expedition",
        },
        {
          title: "Enlevement",
          icon: "pi-cart-minus",
          children: [
            {
              title: "En attente",
              icon: "pi-list",
              path: "/enlevement/attendu",
            },
            {
              title: "Historique",
              icon: "pi-list-check",
              path: "/enlevement/historique",
            },
          ],
        },
        {
          title: "Remise colis web",
          icon: "pi-at",
          children: [
            {
              title: "En attente",
              icon: "pi-list",
              path: "/remise-colis-web/attendu",
            },
            {
              title: "Historique",
              icon: "pi-list-check",
              path: "/remise-colis-web/historique",
            },
          ],
        },
      ],
    },
    {
      title: "Admin",
      children: [
        {
          title: "Gestion des Utilisateurs",
          icon: "pi-user-edit",
          path: "/utilisateurs",
        },
        {
          title: "Gestion des Accès",
          icon: "pi-key",
          path: "/acces",
        },
        {
          title: "Gestion des Magasins",
          icon: "pi-shop",
          path: "/magasins",
        },
        {
          title: "Paramètres Généraux",
          icon: "pi-sliders-h",
          path: "/parametres-generaux",
        },
      ],
    },
    {
      title: "Support",
      children: [
        {
          title: "PDA",
          icon: "pi-mobile",
          path: "/pda",
        },
      ],
    },
    {
      title: "Compte",
      children: [
        {
          title: "Guide utilisateur",
          icon: "pi-info-circle",
          path: "/guide-utilisateur",
        },
        {
          title: "Paramètres",
          icon: "pi-cog",
          path: "parametres",
        },
        {
          title: "Déconnexion",
          icon: "pi-sign-out",
          path: "signout",
        },
      ],
    },
  ];

  logoPaths = {
    logoFull:
      "https://www.familyvillagecostieres-sud.com/-/media/familyvillagecostieressud/images/enseignes/logos/logo_armand_thiery_noir_2_lignes_hd.png?as=0&w=342&hash=6E9D52E72E6037B7F90C5609707F8DC6",
    logoSingle: "https://cdn.armandthiery.fr/ximg/logoSticky.svg",
  };
  logoPath: string =
    window.innerWidth > 991
      ? this.logoPaths.logoSingle
      : this.logoPaths.logoFull;
  constructor(private renderer: Renderer2, private authService: AuthService) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen("window", "click", (e: any) => {
      if (
        !document.getElementById("sidebar-toggle")?.contains(e.target) &&
        !document.getElementById("sidebar")?.contains(e.target)
      ) {
        this.sidebarService.setSidebarState(false);
      }
    });
  }

  onToggleSidebar(state: boolean): void {
    this.sidebarService.setSidebarState(state);
    this.logoPath = state ? this.logoPaths.logoFull : this.logoPaths.logoSingle;
  }

  onHoverSidebar(state: boolean) {
    if (!this.sidebarService.getSidebarState) {
      this.logoPath = state
        ? this.logoPaths.logoFull
        : this.logoPaths.logoSingle;
    }
  }

  onItemClick(item: ISidebarItem): void {
    if (item?.children?.length) {
      item.collapsed = !item.collapsed;
    } else if (item.path == "signout") {
      this.authService.signOut();
    } else {
      this.router.navigateByUrl(item.path as any);
    }
  }
}
