import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { KnobModule } from "primeng/knob";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ParamService } from "../../../../services/api/param.service";
import { HeaderSharedDataService } from "../../../../services/data-shared/header-shared-data.service";
import { Store } from "../../../../interfaces/store";
import { Param } from "../../../../interfaces/param";

@Component({
  selector: "app-seuil-inventaire",
  standalone: true,
  imports: [
    FormsModule,
    KnobModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    TooltipModule,
  ],
  templateUrl: "./seuil-inventaire.component.html",
  styleUrl: "./seuil-inventaire.component.scss",
  providers: [MessageService],
})
export class SeuilInventaireComponent implements OnInit {
  seuil1: any = { value: 0, libelle: null, paramName: "SEUIL1" };
  seuil2: any = { value: 0, libelle: null, paramName: "SEUIL2" };
  seuil3: any = { value: 0, libelle: null, paramName: "SEUIL3" };
  loading: boolean = false;
  selectedStore: Store | null = null;
  data: Param[] = [];
  module: string = "INVENTAIRE";

  constructor(
    private messageService: MessageService,
    private paramService: ParamService,
    private headerData: HeaderSharedDataService
  ) {}

  ngOnInit(): void {
    this.headerData.dataStore$.subscribe({
      next: (data) => {
        this.selectedStore = data;
        if (this.selectedStore && this.selectedStore.id !== undefined) {
          this.loadParams();
        }
      },
    });
  }

  loadParams() {
    const storeId = this.selectedStore!.id;

    this.paramService
      .getParamsByModuleAndStoreIdAndCodeparam("INVENTAIRE", "seuil", storeId)
      .subscribe({
        next: (data: Param[]) => {
          data.forEach((param) => {
            switch (param.codeparam) {
              case this.seuil1.paramName:
                this.seuil1 = {
                  ...this.seuil1,
                  value: Number(param.value),
                  libelle: param.libelle,
                };
                break;
              case this.seuil2.paramName:
                this.seuil2 = {
                  ...this.seuil2,
                  value: Number(param.value),
                  libelle: param.libelle,
                };
                break;
              case this.seuil3.paramName:
                this.seuil3 = {
                  ...this.seuil3,
                  value: Number(param.value),
                  libelle: param.libelle,
                };
                break;
              default:
                console.warn(`Codeparam non géré : ${param.codeparam}`);
            }
          });
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des paramètres", err);
        },
      });
  }

  saveParam() {
    this.loading = true;
    const seuil1Value = this.seuil1.value;
    const seuil2Value = this.seuil2.value;
    const seuil3Value = this.seuil3.value;

    // Corrected comparison using logical AND
    if (seuil1Value < seuil2Value && seuil2Value < seuil3Value) {
      const body = {
        module: this.module,
        storeId: this.selectedStore!.id,
        params: [
          {
            codeparam: this.seuil1.paramName,
            value: seuil1Value,
          },
          {
            codeparam: this.seuil2.paramName,
            value: seuil2Value,
          },
          {
            codeparam: this.seuil3.paramName,
            value: seuil3Value,
          },
        ],
      };

      this.paramService.updateParams(body).subscribe({
        next: (data) => {
          this.loading = false;
          this.messageService.add({
            severity: "success",
            summary: "Enregistré",
            detail: "Les nouveaux seuils ont été enregistrés avec succès",
          });
        },
        error: (err) => {
          this.loading = false;
          console.error("Erreur lors de la mise à jour des paramètres", err);
        },
      });
    } else {
      this.loading = false;
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail: "Les seuils doivent être dans l'ordre croissant",
      });
    }
  }
}
