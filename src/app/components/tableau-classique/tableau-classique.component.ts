import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { SidebarModule } from "primeng/sidebar";
import { InputIconModule } from "primeng/inputicon";
import { IconFieldModule } from "primeng/iconfield";
import { InputTextModule } from "primeng/inputtext";
import { InputSwitchModule } from "primeng/inputswitch";
import { FormsModule } from "@angular/forms";
import { HeaderSharedDataService } from "../../services/data-shared/header-shared-data.service";
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { TagModule } from "primeng/tag";
import { ToggleButtonModule } from "primeng/togglebutton";

@Component({
  selector: "app-tableau-classique",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SidebarModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    InputSwitchModule,
    DateFormatPipe,
    TagModule,
    ToggleButtonModule,
  ],
  templateUrl: "./tableau-classique.component.html",
  styleUrl: "./tableau-classique.component.scss",
})
export class TableauClassiqueComponent implements OnInit {
  @Input() columns: any[];
  @Input() currentData: any[];
  @Input() loading: boolean = true;
  @Input() enableColumnFilters: boolean = true;
  @Output() tableFilter = new EventEmitter<any>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() toggleChange = new EventEmitter<any>();

  globalFilterFields: string[] = [];
  numberOfItems: number = 0;

  constructor(private headerData: HeaderSharedDataService) {}

  ngOnInit() {
    if (this.columns) {
      this.globalFilterFields = this.columns.map((col) => col.field);
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "VALIDE":
        return "Validé";
      case "REJETE":
        return "Réjeté";
      case "ATTENTE":
        return "En attente";
      case "ENCOURS":
        return "En cours";
      case "SUSPENDU":
        return "En suspens";
      case "ABANDON":
        return "Abandonné";
      default:
        return "";
    }
  }

  getSeverity(
    status: string
  ): "success" | "secondary" | "info" | "warning" | "danger" | undefined {
    switch (status) {
      case "ENCOURS":
        return "info";
      case "VALIDE":
        return "success";
      case "REJETE":
        return "danger";
      case "ATTENTE":
        return "warning";
      case "SUSPENDU":
        return "secondary";
      case "ABANDON":
        return "danger";
      default:
        return "secondary";
    }
  }

  getIsLocked(product: any): boolean {
    return !product.enabled;
  }

  onRowClicked(product: any) {
    this.rowClicked.emit(product);
  }

  onToggleChange(product: any) {
    this.toggleChange.emit(product);
  }

  onTableFilter(filteredData: any[]) {
    this.numberOfItems = filteredData ? filteredData.length : 0;
    this.tableFilter.emit(this.numberOfItems);
  }
}
