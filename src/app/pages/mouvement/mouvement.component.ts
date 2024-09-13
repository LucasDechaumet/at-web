import { Component, OnInit } from "@angular/core";
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
  ],
  templateUrl: "./mouvement.component.html",
  styleUrls: ["./mouvement.component.scss"],
  providers: [MessageService],
})
export class MouvementComponent implements OnInit {
  columns = [
    { field: "numero", header: "Numéro" },
    { field: "motif", header: "Motif" },
    { field: "Date", header: "Date" },
    { field: "refQuantité", header: "Ref Quantité" },
    { field: "prodQuantité", header: "Prod Quantité" },
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
  data: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  qrCodeValue: string = "";
  barcodeValue: string = "";
  messages: Message[] = [];
  motif: any[] | undefined;
  selectedMotif: any;
  scannedItem: any[] = [];
  showQrInput: boolean = false;
  showBarcodeInput: boolean = false;

  constructor(
    private messageService: MessageService,
    private stockRfidService: StockRfidService,
    private qrCodeService: QrCodeService,
    private mvtMotifService: MvtMotifService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.mvtMotifService.getMotifsByItemType("MVT.REASON").subscribe({
      next: (data: any) => {
        console.log(data);
        this.motif = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.messages = [
      { severity: "error", detail: "Error Message" },
      { severity: "info", detail: "Info Message" },
      { severity: "warn", detail: "Warn Message" },
      { severity: "success", detail: "Success Message" },
    ];
    this.scannedItem = [
      {
        alarme: null,
        createdAt: "2024-07-05T14:27:14.000+00:00",
        disponible: 1,
        ean: "3616381707215",
        emplacement: null,
        epc: "3039612980A6B842013F6FBF",
        ignored: 0,
        inStock: 1,
        libColorisModifie: "10-NOIR",
        libProduit: "DEBVPARIPLUME",
        libTaille: "3",
        origin: "AK",
        sku: "751301161003",
        statut: "STOCK",
        storeId: 702,
        updatedAt: "2024-08-28T10:43:01.000+00:00",
      },
    ];
  }

  onMotifChange() {
    console.log("selectedMotif:", this.selectedMotif);
    this.checkInputVisibility();
  }

  checkInputVisibility() {
    if (this.selectedMotif) {
      if (this.selectedMotif.code === "55" || this.selectedMotif.code === "54") {
        this.showQrInput = true;
        this.showBarcodeInput = false;
      } else if (this.selectedMotif.code === "111") {
        this.showQrInput = false;
        this.showBarcodeInput = true;
      } else {
        this.showQrInput = false;
        this.showBarcodeInput = false;
      }
    }
  }

  onSave() {
    this.displayDialog = false;
  }

  onCancel() {
    this.displayDialog = false;
  }

  fetchData() {
    this.loading = false;
  }

  getDisponibilityByCode() {
    console.log("selectedMotif:", this.selectedMotif);
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

  verifyAvailabilityEpc(epc: any) {
    const epcDisponibility = this.getDisponibilityByCode();
    if (epcDisponibility == epc.disponible) {
      console.log("EPC is available");
      this.scannedItem.push(epc);
    } else {
      console.log("EPC is not available");
    }
    document.getElementById("qrCodeInput")?.focus();
  }

  onEnterPress() {
    const result = this.qrCodeService.getEpcAndEanFromQrCode(this.qrCodeValue);
    this.qrCodeValue = "";
    if (result) {
      this.stockRfidService.getStockRfidByEpc(result["epc"]).subscribe({
        next: (data) => {
          console.log(data);
          this.verifyAvailabilityEpc(data);
          console.log(this.scannedItem);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
