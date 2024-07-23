import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { ISidebarItem } from './ISidebarItem';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public sidebarConfig = this.sidebarService.sidebarConfig;
  public router: Router = inject(Router);
  items: ISidebarItem[] = [
    {
      "title": "Dashboards",
      "children": [
        {
          "title": "Dashboard",
          "icon": "pi-home",
          "path": "/dashboard"
        },
        {
          "title": "Users",
          "icon": "pi-users",
          "path": "/users"
        }
      ]
    },
    {
      "title": "Apps",
      "children": [
        {
          "title": "Blog",
          "icon": "pi-comment",
          "collapsed": false,
          "children": [
            {
              "title": "Blog",
              "icon": "pi-comment"
            },
            {
              "title": "Blog",
              "icon": "pi-comment"
            },
            {
              "title": "Blog",
              "icon": "pi-comment"
            }
          ]
        },
        {
          "title": "Calendar",
          "icon": "pi-calendar"
        },
        {
          "title": "Chat",
          "icon": "pi-comments"
        },
        {
          "title": "Blog",
          "icon": "pi-comment",
          "collapsed": false,
          "children": [
            {
              "title": "Blog",
              "icon": "pi-comment"
            },
            {
              "title": "Blog",
              "icon": "pi-comment"
            },
            {
              "title": "Blog",
              "icon": "pi-comment"
            }
          ]
        }
      ]
    }
  ];
  logoPaths = {
    logoFull: "https://zakariaatattou.github.io/prime-ng-starter-logo/logo.svg",
    logoSingle: "https://zakariaatattou.github.io/prime-ng-starter-logo/logo-single.svg",
  }
  logoPath: string = window.innerWidth > 991 ? this.logoPaths.logoSingle : this.logoPaths.logoFull
  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click', (e: any) => {
      if (!document.getElementById('sidebar-toggle')?.contains(e.target) && !document.getElementById('sidebar')?.contains(e.target)) {
        this.sidebarService.setSidebarState(false);
      }
    });
  }

  onToggleSidebar(state: boolean): void {
    this.sidebarService.setSidebarState(state)
    this.logoPath = state ? this.logoPaths.logoFull : this.logoPaths.logoSingle
  }

  onHoverSidebar(state: boolean) {
    if (!this.sidebarService.getSidebarState) {
      this.logoPath = state ? this.logoPaths.logoFull : this.logoPaths.logoSingle
    }
  }

  onItemClick(item: ISidebarItem): void {
    if (item?.children?.length) {
      item.collapsed = !item.collapsed
    } else {
      this.router.navigateByUrl(item.path as any)
    }
  }


}
