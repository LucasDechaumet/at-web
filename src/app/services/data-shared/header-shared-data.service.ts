import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Store } from "../../interfaces/store";

@Injectable({
  providedIn: "root",
})
export class HeaderSharedDataService {
  private dataStore = new BehaviorSubject<Store | null>(null);
  public dataStore$ = this.dataStore.asObservable();
  constructor() {}

  updateData(data: Store | null) {
    this.dataStore.next(data);
    localStorage.setItem("SelectedStore", JSON.stringify(data));
  }
}
