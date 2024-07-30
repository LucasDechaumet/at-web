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
      title: "Dashboards",
      children: [
        {
          title: "Expéditions",
          icon: "pi-box",
          path: "/expedition",
        },
        {
          title: "Mouvement",
          icon: "pi-arrow-right-arrow-left",
          path: "/mouvement",
        },
        {
          title: "Inventaire",
          icon: "pi-list-check",
          path: "/inventaire",
        },
        {
          title: "Remise colis web",
          icon: "pi-at",
          path: "/remise-colis-web",
        },
        {
          title: "Enlevement",
          icon: "pi-cart-minus",
          path: "/enlevement",
        },
        {
          title: "Réception",
          icon: "pi-truck",
          path: "/reception",
        },
      ],
    },
    {
      title: "Compte",
      children: [
        {
          title: "Paramètre",
          icon: "pi-cog",
        },
        {
          title: "Déconnexion",
          icon: "pi-sign-out",
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
  constructor(private renderer: Renderer2) {
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
    } else {
      this.router.navigateByUrl(item.path as any);
    }
  }
}
