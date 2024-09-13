import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { HeaderSharedDataService } from "../../services/data-shared/header-shared-data.service";
import { FormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";
import { SidebarModule } from "primeng/sidebar";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CommonModule } from "@angular/common";
import { Store } from "../../interfaces/store";
import { Article } from "../../interfaces/article";
import { ArticleService } from "../../services/api/article.service";
import { StockService } from "../../services/api/stock.service";
import { StockRfidService } from "../../services/api/stock-rfid.service";
import { NgxBarcode6Module } from "ngx-barcode6";

@Component({
  selector: "app-stock",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableauClassiqueComponent,
    InputSwitchModule,
    SidebarModule,
    BreadcrumbModule,
    NgxBarcode6Module,
  ],
  templateUrl: "./stock.component.html",
  styleUrl: "./stock.component.scss",
})
export class StockComponent implements OnInit {
  columnsDefault = [
    { field: "libDepartement", header: "Département" },
    { field: "libRayon", header: "Rayon" },
    { field: "libMetafamille", header: "Méta famille" },
    { field: "libFamille", header: "Famille" },
    { field: "codeProduit", header: "Produit" },
    { field: "sku", header: "SKU" },
    { field: "libProduit", header: "Libellé" },
    { field: "libColorisModifie", header: "Couleur" },
    { field: "libTaille", header: "Taille" },
  ];

  columnsStockByLevel = [
    { field: "departement", header: "Département" },
    { field: "disponibleEnMagasin", header: "Disponible en magasin" },
    { field: "litigeMagasin", header: "Litige magasin" },
    { field: "transitMagasin", header: "Transit magasin" },
    { field: "preparationDepot", header: "Préparation dépôt" },
    { field: "pretMagasin", header: "Prêt magasin" },
  ];

  items = [
    {
      label: "Département",
      command: () => {
        this.profondeur = 0;
        this.searchDataFromChoosenItems();
        this.items = [...this.items.slice(0, this.profondeur + 1)];
      },
    },
  ];

  defaultItems = [...this.items];

  wantedItem: string;

  home = {
    icon: "pi pi-warehouse",
  };

  columns = this.columnsDefault;
  stockNiveau: boolean = false;

  // Données par défaut
  dataDefault: Article[];

  // Données pour le stock par niveau
  dataNiveau: any[];

  currentData: any[];
  profondeur: number = 0;

  loading: boolean = true;
  selectedStore: Store | null;
  selectedProduct: any;
  sidebarVisible: boolean = false;
  subscription: any;
  imageUrl: string;
  selectedProductStock: any;
  selectedProductStockRfid: any;
  numberOfItems: number = 0;
  barcode: string;

  constructor(
    private headerData: HeaderSharedDataService,
    private articleService: ArticleService,
    private stockService: StockService,
    private stockRfidService: StockRfidService
  ) {}

  ngOnInit() {
    this.subscription = this.headerData.dataStore$.subscribe((data) => {
      this.selectedStore = data;
      if (this.selectedStore) {
        this.loading = true;
        this.fetchDataDefault();
        this.fetchDataNiveau();
      } else {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTableFilter($event: any) {
    this.numberOfItems = $event;
  }

  // fetchDataDefault() {
  //   if (this.selectedStore) {
  //     this.articleService
  //       .getArticlesByStoreId(this.selectedStore.id)
  //       .subscribe((data) => {
  //         this.dataDefault = data;
  //         this.currentData = this.dataDefault;
  //         this.loading = false;
  //       });
  //   }
  // }

  fetchDataDefault() {
    if (this.selectedStore) {
      this.articleService.getArticlesByStoreId(this.selectedStore.id).subscribe({
        next: (data) => {
          this.dataDefault = data;
          this.currentData = this.dataDefault;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error("Error fetching default data: ", error);
        },
      });
    }
  }

  fetchDataNiveau() {
    this.dataNiveau = [
      {
        departement: "CONSO VENDABLE",
        disponibleEnMagasin: 1711,
        litigeMagasin: 0,
        transitMagasin: 0,
        preparationDepot: 500,
        pretMagasin: 0,
        subDepartments: [
          {
            rayon: "MARKETING FEMME TOSCANE",
            disponibleEnMagasin: 1007,
            litigeMagasin: 0,
            transitMagasin: 0,
            preparationDepot: 0,
            pretMagasin: 0,
            subDepartments: [
              {
                metafamille: "MARKETING FEMME",
                disponibleEnMagasin: 1007,
                litigeMagasin: 0,
                transitMagasin: 0,
                preparationDepot: 0,
                pretMagasin: 0,
                subDepartments: [
                  {
                    famille: "BOITE CADEAU VENDABLE FEMME",
                    disponibleEnMagasin: 191,
                    litigeMagasin: 0,
                    transitMagasin: 0,
                    preparationDepot: 0,
                    pretMagasin: 0,
                    subDepartments: [
                      {
                        produit: "BOITES CADEAUX ATF GM 2022",
                        disponibleEnMagasin: 26,
                        litigeMagasin: 0,
                        transitMagasin: 0,
                        preparationDepot: 0,
                        pretMagasin: 0,
                      },
                      {
                        produit: "BOITES CADEAUX ATF MM 2022",
                        disponibleEnMagasin: 72,
                        litigeMagasin: 0,
                        transitMagasin: 0,
                        preparationDepot: 0,
                        pretMagasin: 0,
                      },
                      {
                        produit: "BOITES CADEAUX ATF PM 2022",
                        disponibleEnMagasin: 93,
                        litigeMagasin: 0,
                        transitMagasin: 0,
                        preparationDepot: 0,
                        pretMagasin: 0,
                      },
                    ],
                  },
                  {
                    famille: "SACS PAPIER VENDABLES FEMME",
                    disponibleEnMagasin: 816,
                    litigeMagasin: 0,
                    transitMagasin: 0,
                    preparationDepot: 0,
                    pretMagasin: 0,
                  },
                ],
              },
            ],
          },
          {
            rayon: "MARKETING HOMME EDJI",
            disponibleEnMagasin: 704,
            litigeMagasin: 0,
            transitMagasin: 0,
            preparationDepot: 500,
            pretMagasin: 0,
          },
        ],
      },
      {
        departement: "CONSOMMABLE",
        disponibleEnMagasin: -45,
        litigeMagasin: 0,
        transitMagasin: 1,
        preparationDepot: 0,
        pretMagasin: 0,
      },
      {
        departement: "FEMME",
        disponibleEnMagasin: 4322,
        litigeMagasin: -10,
        transitMagasin: 2,
        preparationDepot: 74,
        pretMagasin: 0,
      },
      {
        departement: "HOMME",
        disponibleEnMagasin: 8653,
        litigeMagasin: -32,
        transitMagasin: 2,
        preparationDepot: 464,
        pretMagasin: 0,
      },
    ];
  }

  onSwitchChange() {
    this.columns = this.stockNiveau ? this.columnsStockByLevel : this.columnsDefault;
    this.currentData = this.stockNiveau ? this.dataNiveau : this.dataDefault;
    if (!this.stockNiveau) {
      this.items = this.defaultItems;
    }
    if (this.stockNiveau) {
      this.columnsStockByLevel[0] = {
        field: "departement",
        header: "Département",
      };
    }
  }

  onRowClicked(product: any) {
    this.selectedProduct = product;
    if (this.stockNiveau && (product.departement || product.subDepartments)) {
      this.profondeur++;
      this.changeTitle(product);
      this.currentData = product.subDepartments;
    } else {
      this.showDetails();
    }
    if (!this.stockNiveau) {
      this.imageUrl = this.generateImageUrl(
        this.selectedProduct.codeProduit,
        this.selectedProduct.codeColoris
      );
      this.barcode = this.selectedProduct.ean;
      console.log("barcode", this.barcode);
      this.stockService.getStockByEan(this.selectedProduct.ean).subscribe({
        next: (data) => {
          this.selectedProductStock = data;
        },
        error: (error) => {
          console.error("Error fetching stock data: ", error);
        },
      });
      if (!this.selectedStore) {
        return;
      }
      this.stockRfidService
        .countByEanAndStoreId(this.selectedProduct.ean, this.selectedStore.id)
        .subscribe({
          next: (data) => {
            this.selectedProductStockRfid = data;
          },
          error: (error) => {
            console.error("Error fetching stock RFID data: ", error);
          },
        });

      this.showDetails();
    }
  }

  generateImageUrl(codeProduit: string, codeColoris: string): string {
    if (codeProduit && codeColoris) {
      return "https://pda.armandthiery.fr/h/" + codeProduit + "_" + codeColoris + ".jpg";
    } else {
      return "placeholder.png";
    }
  }

  //garde que les impairs
  getChoosenItems() {
    const indexOfWantedItem = this.items.findIndex(
      (item) => item.label === this.wantedItem
    );
    this.items = [...this.items.slice(0, indexOfWantedItem + 1)];
    return this.items.filter((_, index) => index % 2 !== 0);
  }

  searchDataFromChoosenItems(data?: any) {
    this.loading = true;
    const choosenItems = this.getChoosenItems();

    if (!choosenItems.length) {
      this.loading = false;
      return;
    }

    let searchedData = data ?? this.dataNiveau;

    for (let i = 0; i < choosenItems.length; i++) {
      const currentChoosenItem = choosenItems[i].label;
      let found = false;

      for (let element of searchedData) {
        const relevantKey = this.findRelevantKey(element, currentChoosenItem);

        if (relevantKey && element[relevantKey] === currentChoosenItem) {
          found = true;

          // Si nous sommes au dernier élément choisi, mettez à jour currentData
          if (i === choosenItems.length - 1 || !element.subDepartments) {
            this.currentData = element.subDepartments ?? [];
            this.changeTitle(element);
            this.loading = false;
            return;
          }

          // Passer au niveau suivant
          searchedData = element.subDepartments;
          break;
        }
      }

      if (!found) {
        break;
      }
    }
    this.loading = false;
  }

  findRelevantKey(element: any, currentChoosenItem: string): string | null {
    const keys = Object.keys(element);
    for (const key of keys) {
      if (element[key] === currentChoosenItem) {
        return key;
      }
    }
    return null;
  }

  changeTitle(product: any) {
    const firstPropertyName = this.getFirstPropertiesNames(product);
    const nextFirstPropertyName = Object.keys(product.subDepartments[0])[0];
    const nextFirstPropertyNameUpperCase =
      this.changeIntoUpperCase(nextFirstPropertyName);
    this.changeNameFirstColumn(nextFirstPropertyName);
    const valueFirstProperty = product[firstPropertyName];
    this.addBreadcrumb(valueFirstProperty, nextFirstPropertyNameUpperCase);
  }

  getFirstPropertiesNames(obj: any): string {
    return Object.keys(obj)[0];
  }

  showDetails() {
    this.sidebarVisible = true;
  }

  changeIntoUpperCase(name: string): string {
    return name.toLowerCase().charAt(0).toUpperCase() + name.slice(1);
  }

  changeNameFirstColumn(name: string) {
    const nameUpperCase = this.changeIntoUpperCase(name);
    this.columnsStockByLevel[0] = {
      field: name,
      header: nameUpperCase,
    };
  }

  getProfondeurWithPropertyName(propertyName: string): number {
    return this.items.findIndex((item) => item.label === propertyName);
  }

  addBreadcrumb(valueName: string, propertyName: string) {
    this.items = [...this.items];
    this.items.push({ label: valueName, command: () => {} });
    if (propertyName.toLowerCase() !== "produit") {
      this.items.push({
        label: propertyName,
        command: () => {
          this.wantedItem = propertyName;

          // Éviter d'appeler getProfondeurWithPropertyName si c'est "Produit"
          if (propertyName.toLowerCase() !== "produit") {
            this.profondeur = this.getProfondeurWithPropertyName(propertyName);
          }

          this.searchDataFromChoosenItems();
          this.items = [...this.items.slice(0, this.profondeur + 1)];
        },
      });
      return;
    }
  }
}
