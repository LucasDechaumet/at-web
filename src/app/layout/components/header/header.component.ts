import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { SidebarService } from "../sidebar/sidebar.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { HeaderSharedDataService } from "../../../services/data-shared/header-shared-data.service";
import { StoreService } from "../../../services/api/store.service";
import { Store } from "../../../interfaces/store";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public height: string = "1.5rem";
  public sidebarService = inject(SidebarService);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  public moduleTitle: string;

  stores: Store[] = [];

  selectedStore: Store | null = null;

  constructor(
    private headerService: HeaderSharedDataService,
    private storeService: StoreService,
    private messageService: MessageService
  ) {
    // Subscribe to router events to handle navigation changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.snapshot.data)
      )
      .subscribe((data: any) => {
        this.moduleTitle = data["title"];
      });
  }

  ngOnInit(): void {
    const selectedStore = localStorage.getItem("SelectedStore");
    if (selectedStore) {
      this.selectedStore = JSON.parse(selectedStore);
      this.headerService.updateData(this.selectedStore);
    }
    this.storeService.getStores().subscribe({
      next: (response: Store[]) => {
        this.stores = response;
      },
      error: (error) => {
        console.error("Error fetching stores:", error);
      },
    });
  }

  ngAfterViewInit(): void {
    if (!this.selectedStore) {
      this.messageService.add({
        severity: "warn",
        summary: "Attention",
        detail: "Veuillez selectionner un magasin",
        sticky: true,
      });
    }
  }

  onStoreChange() {
    this.headerService.updateData(this.selectedStore);
  }
  onToggleSidebar(): void {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState);
  }
}
