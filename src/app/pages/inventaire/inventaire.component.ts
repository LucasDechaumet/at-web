import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { HeaderSharedDataService } from "../../services/data-shared/header-shared-data.service";
import { Store } from "../../interfaces/store";
import { InventaireService } from "../../services/api/inventaire.service";
import { Inventaire } from "../../interfaces/inventaire";
import { Status } from "../../enums/status";
import { Router } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import { ChartModule } from "primeng/chart";
import { CommonModule, DatePipe } from "@angular/common";
import { KnobModule } from "primeng/knob";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ActiveElement, Chart, ChartEvent, ChartOptions } from "chart.js";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ArticleService } from "../../services/api/article.service";
import { forkJoin, map } from "rxjs";

Chart.register(ChartDataLabels);

@Component({
  selector: "app-inventaire",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableauClassiqueComponent,
    SidebarModule,
    ChartModule,
    KnobModule,
    TooltipModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextareaModule,
  ],
  templateUrl: "./inventaire.component.html",
  styleUrl: "./inventaire.component.scss",
  providers: [DatePipe, ConfirmationService, MessageService],
})
export class InventaireComponent implements OnInit {
  columns = [
    { field: "createdAt", header: "Date de création" },
    { field: "pourcentage", header: "Pourcentage" },
    { field: "quantiteTotal", header: "Articles Trouvés" },
    { field: "ecartPlus", header: "Ecart +" },
    { field: "ecartMoins", header: "Ecart -" },
    { field: "status", header: "Status" },
    { field: "dateStatus", header: "Date de status" },
    { field: "description", header: "Commentaire" },
  ];
  inventoryData: any[] = [];
  loading: boolean = true;
  selectedStore: Store | null;
  sidebarVisible: boolean = false;
  dialogVisible: boolean = false;
  selectedInventory: Inventaire | null;
  seuil1: number = 0;
  seuil2: number = 0;
  seuil3: number = 0;

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue("--text-color");
  chartsData: any;
  options: ChartOptions = {};
  detailData: any[] = [];
  selectedColor: any;
  selectedLabel: any;
  selectedIcon: string;
  pourcentage: number | null;
  pourcentageLabel: string;
  colorKnob: any;
  epcMissing: number;
  seuilDialogVisible: any;
  newSeuil: number = 97;
  commentaire: string = "";

  constructor(
    private headerDataService: HeaderSharedDataService,
    private inventaireService: InventaireService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.headerDataService.dataStore$.subscribe((data) => {
      this.selectedStore = data;
      console.log("Selected Store", this.selectedStore);
      this.fetchData();
    });
  }

  qualifyInventory(status: string) {
    console.log("inventoryId", this.selectedInventory?.id);
    console.log("Status", status);
    console.log("Commentaire", this.commentaire);
    console.log("NewSeuil", this.newSeuil);
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Voulez-vous vraiment valider cet inventaire ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmation",
          detail: "Vous avez bien validé l'inventaire",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Annulation",
          detail: "Vous avez bien annulé la validation de l'inventaire",
          life: 3000,
        });
      },
    });
  }

  showDialog() {
    this.seuilDialogVisible = true;
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "voulez-vous vraiment rejeter cet inventaire ?",
      header: "Confirmation de rejet",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmation",
          detail: "Vous avez bien rejeté l'inventaire",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Annulation",
          detail: "Vous avez bien annulé le rejet de l'inventaire",
        });
      },
    });
  }

  fetchData() {
    if (!this.selectedStore) {
      return;
    }
    this.inventaireService.getInventories(this.selectedStore.id).subscribe({
      next: (data) => {
        this.inventoryData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  isRelevantStatus(inventory: Inventaire): boolean {
    const statusValue = Status[inventory.status as unknown as keyof typeof Status];
    return (
      statusValue === Status.VALIDE ||
      statusValue === Status.REJETE ||
      statusValue === Status.ATTENTE
    );
  }

  wichStatusIs(inventory: Inventaire): string {
    const statusValue = Status[inventory.status as unknown as keyof typeof Status];
    switch (statusValue) {
      case Status.VALIDE:
        return "validé";
      case Status.REJETE:
        return "rejeté";
      case Status.ATTENTE:
        return "en attente";
      default:
        return "Inconnu";
    }
  }

  wichLabelForPourcentage(): string {
    if (this.pourcentage === null) {
      return "";
    } else if (this.pourcentage >= this.seuil1 && this.pourcentage < this.seuil2) {
      this.colorKnob = "#dc3545";
      return "Cet inventaire a atteint le seuil 1";
    } else if (this.pourcentage >= this.seuil2 && this.pourcentage < this.seuil3) {
      this.colorKnob = "#ffc107";
      return "Cet inventaire a atteint le seuil 2";
    } else if (this.pourcentage >= this.seuil3 && this.pourcentage <= 100) {
      this.colorKnob = "#28a745";
      return "Cet inventaire a atteint le seuil 3";
    } else {
      return "";
    }
  }

  onRowClicked(inventory: Inventaire) {
    this.selectedInventory = inventory;
    this.pourcentage = inventory.pourcentage;
    this.seuil1 = inventory.seuil1;
    this.seuil2 = inventory.seuil2;
    this.seuil3 = inventory.seuil3;
    this.pourcentageLabel = this.wichLabelForPourcentage();
    if (this.isRelevantStatus(inventory)) {
      this.inventaireService.getInventoryDetailsByFamille(inventory.id).subscribe({
        next: (data) => {
          this.inventaireService.countEpcMissing(inventory.id).subscribe({
            next: (data) => {
              this.epcMissing = data;
              console.log("EPC Missing", data);
            },
            error: (error) => {
              console.error(error);
            },
          });
          const backgroundColors = [
            "#FF6F61",
            "#F7CAC9",
            "#92A8D1",
            "#88B04B",
            "#F49AC2",
            "#FFD700",
            "#FFB347",
            "#C5E384",
            "#D4A5A5",
            "#B39EB5",
            "#FF9E80",
            "#FF7F50",
            "#FFB6C1",
            "#87CEEB",
            "#77DD77",
            "#AEC6CF",
            "#FF6961",
            "#CFCFC4",
            "#FDFD96",
            "#779ECB",
          ];

          const hoverBackgroundColors = backgroundColors;

          this.chartsData = {
            labels: data.labelsData,
            datasets: [
              {
                data: data.valuesData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors,
              },
            ],
          };

          this.options = {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                  color: this.textColor,
                },
              },
              datalabels: {
                formatter: (value: any, ctx: any) => {
                  const total = ctx.dataset.data.reduce(
                    (acc: any, val: any) => acc + val,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(2) + "%";
                  return percentage;
                },
                color: "#fff",
                font: {
                  size: 22,
                  weight: "bold",
                },
                // Display percentage only if the segment is large enough
                display: (ctx: any) => {
                  const dataset = ctx.chart.data.datasets[ctx.datasetIndex];
                  const data = dataset.data[ctx.dataIndex];
                  const total = dataset.data.reduce((acc: any, val: any) => acc + val, 0);
                  const percentage = (data / total) * 100;

                  // Show label only if the segment is larger than 5%
                  return percentage > 5;
                },
              },
            },
            onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
              if (elements.length > 0) {
                const chartElement = elements[0];
                console.log("elements ", elements);
                const datasetIndex = chartElement.datasetIndex;
                const index = chartElement.index;
                const clickedLabel = this.chartsData.labels[index];
                const clickedColor = this.chartsData.datasets[0].backgroundColor[index];
                this.selectedLabel = clickedLabel;
                this.selectedColor = clickedColor;

                this.inventaireService
                  .getEanByFamille(inventory.id, clickedLabel)
                  .subscribe({
                    next: (data) => {
                      console.log(data);

                      // Utiliser 'forkJoin' pour attendre toutes les requêtes asynchrones
                      const requests = data.map((element: any) => {
                        return this.articleService.getPhotoUrlByEan(element.ean).pipe(
                          map((photoUrl: string) => {
                            // Ajouter 'photoUrl' à l'objet de données d'origine
                            return {
                              ...element,
                              photoUrl,
                            };
                          })
                        );
                      });

                      // Utiliser forkJoin pour attendre que tous les appels soient terminés
                      forkJoin(requests).subscribe({
                        next: (updatedData: any) => {
                          // Log de l'objet combiné avec ean, countEan et photoUrl
                          console.log("Updated data with photo URLs:", updatedData);

                          this.dialogVisible = true;
                          this.cdr.detectChanges();
                          this.detailData = updatedData;
                        },
                        error: (error) => {
                          console.error(error);
                        },
                      });
                    },
                    error: (error) => {
                      console.error(error);
                    },
                  });
              }
            },
          };
          this.sidebarVisible = true;
        },
        error: (error) => {
          console.error(error);
          this.sidebarVisible = false;
        },
      });
    }
  }
}
