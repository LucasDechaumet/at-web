import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-modal-save-cancel",
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  templateUrl: "./modal-save-cancel.component.html",
  styleUrls: ["./modal-save-cancel.component.scss"],
})
export class ModalSaveCancelComponent {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() header: string = "";
  @Input() displayDialog: boolean = false;
  @Input() width: string = "25rem";

  onSave() {
    this.save.emit(); // Émet l'événement de sauvegarde
  }

  onCancel() {
    this.cancel.emit(); // Émet l'événement d'annulation
  }
}
