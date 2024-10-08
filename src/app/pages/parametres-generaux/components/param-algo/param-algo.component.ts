import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TagModule } from "primeng/tag";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProductService } from "../../../../services/api/product.service";
import { FormsModule } from "@angular/forms";
import { ParamInventaireAlgoService } from "../../../../services/api/param-inventaire-algo.service";
import { SpeedDialModule } from "primeng/speeddial";
import { ModalSaveCancelComponent } from "../../../../components/modal-save-cancel/modal-save-cancel.component";
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: "app-param-algo",
  templateUrl: "./param-algo.component.html",
  styleUrls: ["./param-algo.component.scss"],
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ToastModule,
    CommonModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    SpeedDialModule,
    ModalSaveCancelComponent,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ProductService, ConfirmationService],
})
export class ParamAlgoComponent implements OnInit {
  products!: ParamAlgo[];

  clonedProducts: { [id: number]: ParamAlgo } = {};

  displayDialog: boolean = false;

  newProduct = {
    pourcentageInventaire: "",
    nombreInventaire: "",
    delaiInventaire: "",
  };

  items: any[] = [
    {
      icon: "pi pi-plus",
      tooltipOptions: {
        tooltipLabel: "Ajouter un paramètre",
        tooltipPosition: "left",
      },
      command: () => {
        this.displayDialog = true;
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

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private paramInventaireAlgoService: ParamInventaireAlgoService
  ) {}

  ngOnInit() {
    this.paramInventaireAlgoService
      .getParamInventaireAlgo()
      .subscribe((data: ParamAlgo[]) => {
        this.products = data;
      });
  }

  onCancel() {
    // Reset the fields
    this.newProduct = {
      pourcentageInventaire: "",
      nombreInventaire: "",
      delaiInventaire: "",
    };
    this.displayDialog = false; // Close dialog
  }

  onSave() {
    this.displayDialog = false; // Close dialog
    this.paramInventaireAlgoService.addParam(this.newProduct).subscribe({
      next: (data) => {
        this.products = [...this.products, data];
        this.messageService.add({
          severity: "success",
          summary: "Succès",
          detail: "Paramètre ajouté",
        });
      },
      error: (error) => {
        console.error("error", error);
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Erreur lors de l'ajout du paramètre. Contactez le service informatique.",
        });
      },
    });
  }

  onRowEditInit(product: ParamAlgo) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: ParamAlgo) {
    this.paramInventaireAlgoService.updateParam(product).subscribe({
      next: () => {
        delete this.clonedProducts[product.id];
        this.messageService.add({
          severity: "success",
          summary: "Succès",
          detail: "Paramètre supprimé",
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Erreur lors de la suppression du paramètre. Contactez le service informatique.",
        });
      },
    });
  }

  onRowEditCancel(product: ParamAlgo, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  onDelete(product: ParamAlgo) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer ce paramètre ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-text p-button-secondary",
      accept: () => {
        this.deleteProduct(product);
      },
      reject: () => {
        this.messageService.add({
          severity: "info",
          summary: "Annulé",
          detail: "Suppression annulée",
        });
      },
    });
  }

  deleteProduct(product: ParamAlgo) {
    this.paramInventaireAlgoService.deleteParam(product.id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.messageService.add({
          severity: "success",
          summary: "Succès",
          detail: "Paramètre supprimé",
        });
      },
      error: (error) => {
        console.error("error", error);
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Erreur lors de la suppression du paramètre. Contactez le service informatique.",
        });
      },
    });
  }
}

export interface ParamAlgo {
  id: number;
  pourcentageInventaire: number;
  nombreInventaire: number;
  delaiInventaire: number;
  createdAt: string;
  updatedAt: string | null;
}
