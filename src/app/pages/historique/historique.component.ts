import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { TableLazyLoadEvent, TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { CalendarModule } from "primeng/calendar";
import { HistoryService } from "../../services/api/history.service";
import { HeaderSharedDataService } from "../../services/data-shared/header-shared-data.service";

@Component({
  selector: "app-historique",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DateFormatPipe,
    TagModule,
    CalendarModule,
  ],
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.scss"],
})
export class HistoriqueComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  rangeDates: Date[] = [];
  isLoaded: boolean = false;
  storeId: number | null = null;

  rowHeight: number = 0;
  rows: number = 0;

  constructor(
    private historyService: HistoryService,
    private headerSharedDataService: HeaderSharedDataService
  ) {}

  ngOnInit() {
    this.headerSharedDataService.dataStore$.subscribe({
      next: (data) => {
        if (data) {
          this.storeId = data.id;
        }
      },
    });

    const today = new Date();
    this.rangeDates = [today, today]; // Default date range is today

    this.rowHeight = this.getRemInPixels(2); // Convert 2rem to pixels
    console.log("Row height: ", this.rowHeight);
    this.calculateRows(); // Dynamically calculate rows
    this.loading = false;
  }

  // Convert rem to pixels based on the root font size
  getRemInPixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  // Calculate the number of rows dynamically based on screen height
  calculateRows() {
    const visibleHeight = window.innerHeight - 95;
    this.rows = Math.floor(visibleHeight / this.rowHeight) * 2; // Load twice the visible rows
    console.log("Rows: ", this.rows);
  }

  // This function will be called when lazy loading is triggered
  loadHistoriesLazy(event: TableLazyLoadEvent) {
    // Vérifier que storeId et rangeDates sont définis
    if (!this.storeId || !this.rangeDates || this.rangeDates.length < 2) {
      return;
    }
    console.log("On loadHistoriesLazy");

    // Convertir les dates en format ISO
    const startDate = this.rangeDates[0].toISOString().split("T")[0]; // Extrait uniquement la date
    const endDate = this.rangeDates[1].toISOString().split("T")[0]; // Extrait uniquement la date

    // Assigner des valeurs par défaut si first ou rows ne sont pas définis
    const offset = event.first || 0;
    const size = event.rows || 30;

    // Appeler le service pour obtenir les historiques

    console.log(
      "storeId",
      this.storeId + " startDate",
      startDate + " endDate",
      endDate + " offset",
      offset + " size",
      size
    );

    this.historyService
      .getHistories(this.storeId, startDate, endDate, offset, size)
      .subscribe((data) => {
        this.products = data;
        console.log("data lenght : ", this.products.length);
        this.loading = false;
      });
  }
}
