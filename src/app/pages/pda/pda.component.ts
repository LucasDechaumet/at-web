import { Component, OnInit } from "@angular/core";
import { TableauClassiqueComponent } from "../../components/tableau-classique/tableau-classique.component";
import { DialogModule } from "primeng/dialog";
import { InputOtpModule } from "primeng/inputotp";
import { FormsModule } from "@angular/forms";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-pda",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableauClassiqueComponent,
    DialogModule,
    InputOtpModule,
    ProgressSpinnerModule,
  ],
  templateUrl: "./pda.component.html",
  styleUrl: "./pda.component.scss",
})
export class PdaComponent implements OnInit {
  columns = [
    { field: "nomMagasin", header: "Nom du magasin" },
    { field: "ville", header: "Ville" },
    { field: "idPda", header: "ID-PDA" },
  ];
  data: any[] = [
    {
      nomMagasin: "CD Plat Homme Edji - ND4",
      ville: "Paris",
      idPda: "PDA-001",
    },
    {
      nomMagasin: "CD Cintre - ND3",
      ville: "Lille",
      idPda: "PDA-002",
    },
    {
      nomMagasin: "CD Plat Femme Toscane - CD5",
      ville: "Lyon",
      idPda: "PDA-003",
    },
  ];
  loading: boolean = true;
  visible: boolean = false;
  otpValue: number;
  otpLoading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.loading = false;
  }
  onRowClicked(event: any) {
    this.visible = true;
  }
  onOtpChanged() {
    if (this.otpValue.toString().length === 4) {
      this.otpLoading = true;
      setTimeout(() => {
        this.otpLoading = false;
        this.visible = false;
        this.otpValue = 0;
      }, 1500);
    }
  }
}
