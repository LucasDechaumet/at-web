import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TableModule } from "primeng/table";
import { PdaService } from "../../../services/api/pda.service";

@Component({
  selector: "app-liste-pda",
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: "./liste-pda.component.html",
  styleUrl: "./liste-pda.component.scss",
})
export class ListePdaComponent implements OnInit {
  pdaData: any[];
  loading: boolean = true;

  constructor(private pdaService: PdaService) {}

  ngOnInit(): void {
    this.pdaService.getAll().subscribe({
      next: (data: any) => {
        console.log(data);
        this.pdaData = data;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
