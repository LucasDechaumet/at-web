import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { SpeedDialModule } from "primeng/speeddial";
import { Message, MessageService } from "primeng/api";
import { TooltipModule } from "primeng/tooltip";
import { ModalSaveCancelComponent } from "../../components/modal-save-cancel/modal-save-cancel.component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { StockRfidService } from "../../services/api/stock-rfid.service";
import { QrCodeService } from "../../services/core/qr-code.service";
import { MessagesModule } from "primeng/messages";
import { CommonModule } from "@angular/common";
import { MvtMotifService } from "../../services/api/mvt-motif.service";
import { TableModule } from "primeng/table";
import { BadgeModule } from "primeng/badge";
import { ArticleService } from "../../services/api/article.service";
import { HeaderSharedDataService } from "../../services/data-shared/header-shared-data.service";
import { HistoryService } from "../../services/api/history.service";
import { SidebarModule } from "primeng/sidebar";

@Component({
  selector: "app-mouvement",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableauClassiqueComponent,
    SpeedDialModule,
    TooltipModule,
    ModalSaveCancelComponent,
    DropdownModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    MessagesModule,
    TableModule,
    BadgeModule,
    SidebarModule,
  ],
  templateUrl: "./mouvement.component.html",
  styleUrls: ["./mouvement.component.scss"],
  providers: [MessageService],
})
export class MouvementComponent implements OnInit {
  columns = [
    { field: "codeMvt", header: "Motif" },
    { field: "createdAt", header: "Date" },
    { field: "libProduit", header: "Produit" },
    { field: "epc", header: "EPC" },
    { field: "ean", header: "EAN" },
  ];
  items: any[] = [
    {
      icon: "pi pi-plus",
      tooltipOptions: {
        tooltipLabel: "Ajouter un mouvement",
        tooltipPosition: "left",
      },
      command: () => {
        this.displayDialog = true;
        this.messageService.add({
          severity: "info",
          summary: "Add",
          detail: "Data Added",
        });
      },
    },
    {
      icon: "pi pi-refresh",
      command: () => {
        this.messageService.add({
          severity: "success",
          summary: "Update",
          detail: "Data Updated",
        });
      },
      tooltipOptions: {
        tooltipLabel: "Mettre à jour",
        tooltipPosition: "left",
      },
    },
  ];

  tableData: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  messages: Message[] = [];
  motifs: any[] | undefined;
  selectedMotif: any;
  scannedItem: any[] = [];
  selectedStore: any;
  dialogInputValue: string;
  inputType: string;
  inputPlaceholder: string;
  @ViewChild("inputField") inputField: ElementRef;
  sidebarVisible: boolean = false;
  selectedProduct: any;

  constructor(
    private messageService: MessageService,
    private stockRfidService: StockRfidService,
    private qrCodeService: QrCodeService,
    private mvtMotifService: MvtMotifService,
    private articleService: ArticleService,
    private headerDataSharedService: HeaderSharedDataService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    // Example data to add to scannedItem
    const exampleData1 = {
      epc: "3039612980A6B842013F6FBF",
      storeId: 702,
      statut: "STOCK",
      ean: "3616381707215",
      disponible: 1,
      alarme: null,
      createdAt: "2024-07-05T14:27:14.000+00:00",
      emplacement: null,
      ignored: 0,
      inStock: 1,
      libColorisModifie: "10-NOIR",
      libProduit: "DEBVPARIPLUME",
      libTaille: "3",
      origin: "AK",
      sku: "751301161003",
      updatedAt: "2024-08-28T10:43:01.000+00:00",
    };

    const exampleData2 = {
      epc: "3039612980A6B842013F6FBF2",
      storeId: 702,
      statut: "STOCK",
      ean: "3616381707216",
      disponible: 1,
      alarme: null,
      createdAt: "2024-07-06T14:27:14.000+00:00",
      emplacement: null,
      ignored: 0,
      inStock: 1,
      libColorisModifie: "12-BLANC",
      libProduit: "DEBVPARIPLUME",
      libTaille: "4",
      origin: "AK",
      sku: "751301161004",
      updatedAt: "2024-08-29T10:43:01.000+00:00",
    };

    const exampleData3 = {
      epc: "3039612980A6B842013F6FBF3",
      storeId: 702,
      statut: "STOCK",
      ean: "3616381707217",
      disponible: 1,
      alarme: null,
      createdAt: "2024-07-07T14:27:14.000+00:00",
      emplacement: null,
      ignored: 0,
      inStock: 1,
      libColorisModifie: "14-ROUGE",
      libProduit: "DEBVPARIPLUME",
      libTaille: "5",
      origin: "AK",
      sku: "751301161005",
      updatedAt: "2024-08-30T10:43:01.000+00:00",
    };

    const exampleData4 = {
      epc: "3039612980A6B842013F6FBF4",
      storeId: 702,
      statut: "STOCK",
      ean: "3616381707218",
      disponible: 1,
      alarme: null,
      createdAt: "2024-07-08T14:27:14.000+00:00",
      emplacement: null,
      ignored: 0,
      inStock: 1,
      libColorisModifie: "16-VERT",
      libProduit: "DEBVPARIPLUME",
      libTaille: "6",
      origin: "AK",
      sku: "751301161006",
      updatedAt: "2024-08-31T10:43:01.000+00:00",
    };

    // Push the four example objects to scannedItem array
    this.scannedItem.push(exampleData1, exampleData2, exampleData3, exampleData4);

    // Fetch motifs by item type
    this.mvtMotifService.getMotifsByItemType("MVT.REASON").subscribe({
      next: (data: any) => {
        this.motifs = data;
      },
      error: (error) => {
        console.error(error);
      },
    });

    // Subscribe to store data
    this.headerDataSharedService.dataStore$.subscribe((data) => {
      this.selectedStore = data;
    });

    this.fetchData();
  }

  onMotifChange() {
    this.scannedItem = [];
    this.dialogInputValue = "";

    if (this.selectedMotif) {
      if (this.selectedMotif.code === "55" || this.selectedMotif.code === "54") {
        this.inputType = "qr";
        this.inputPlaceholder = "QR code";
      } else {
        this.inputType = "barcode";
        this.inputPlaceholder = "Code barre";
      }
    }

    setTimeout(() => {
      if (this.inputField?.nativeElement) {
        this.inputField.nativeElement.focus();
      }
    }, 50);
  }

  getIconStyle() {
    return this.inputType === "qr" ? "pi pi-qrcode" : "pi pi-barcode";
  }

  onRowClicked(event: any) {
    this.sidebarVisible = true;
    this.selectedProduct = event;
  }

  onSave() {
    this.displayDialog = false;
  }

  onCancel() {
    this.displayDialog = false;
    this.scannedItem = []; // Réinitialiser les articles scannés
    this.dialogInputValue = ""; // Réinitialiser la valeur du champ de saisie
    this.selectedMotif = null; // Réinitialiser le dropdown à aucun motif sélectionné
    this.inputType = ""; // Réinitialiser le type d'entrée (QR code ou code-barres)
    this.inputPlaceholder = ""; // Réinitialiser le placeholder du champ d'entrée
  }

  onDelete(item: any) {
    this.scannedItem = this.scannedItem.filter((i) => i !== item);
    this.messageService.add({
      severity: "warn",
      summary: "Supprimé",
      detail: `L'article ${item.libProduit} a été supprimé`,
    });
  }

  fetchData() {
    this.historyService.getHistoriesByType("mouvement", this.selectedStore.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tableData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  getDisponibilityByCode() {
    switch (this.selectedMotif.code) {
      case "54":
        return 1;
      case "55":
        return 0;
      case "111":
        return 2;
      default:
        return 0;
    }
  }

  verifyAvailabilityEpc(epc: any): boolean {
    const epcDisponibility = this.getDisponibilityByCode();
    if (epcDisponibility == epc.disponible) {
      return true;
    } else {
      return false;
    }
  }

  onEnterPress() {
    if (this.inputType === "qr") {
      this.isQrCodeUrl(this.dialogInputValue)
        ? this.handleQrCode(this.dialogInputValue, this.getDisponibilityByCode())
        : console.log("Invalid QR code URL");
      this.dialogInputValue = "";
    } else if (this.inputType === "barcode") {
      this.isQrCodeUrl(this.dialogInputValue)
        ? console.log("Barcode non valide (QR code detected)")
        : console.log("Barcode entered:", this.dialogInputValue);
      this.dialogInputValue = "";
    }
  }

  handleQrCode(qrCodeValue: string, disponible: number) {
    const qrCodeData = this.qrCodeService.getEpcAndEanFromQrCode(qrCodeValue);

    if (qrCodeData) {
      const epc = qrCodeData["epc"];
      this.stockRfidService
        .verifyAvailability(epc, this.selectedStore.id, disponible)
        .subscribe({
          next: (data: any) => {
            this.scannedItem.push(data);
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      console.error("Invalid QR code or data not found.");
    }
  }

  handleBarcode() {}

  isQrCodeUrl(value: string): boolean {
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i; // Regex pour vérifier une URL commençant par https://
    return regex.test(value);
  }
}
